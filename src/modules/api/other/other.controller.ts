import { Controller, Get, Post, Body, Req, Headers } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { FastifyRequest } from 'fastify';
import { Authorize } from '@/modules/admin/core/decorators/authorize.decorator';
import SysUser from '@/entities/admin/sys-user.entity';
import { LoginDto } from '@/modules/api/other/dto/dto';
import { RedisService } from '@/shared/services/redis.service';
import { UtilService } from '@/shared/services/util.service';
import { SysLogService } from '@/modules/admin/system/log/log.service';
import { PermissionOptional } from '@/modules/admin/core/decorators/permission-optional.decorator';
import { User } from '@/common/decorators/user.decorator';

@Controller()
export class OtherController {
  constructor(
    @InjectRepository(SysUser)
    private userRepository: Repository<SysUser>,
    private jwtService: JwtService,
    private redisService: RedisService,
    private utils: UtilService,
    private logService: SysLogService,
  ) {}

  @Post('/api/login')
  @Authorize()
  async login(
    @Body() body: LoginDto,
    @Req() req: FastifyRequest,
    @Headers('user-agent') ua: string,
  ) {
    const user = await this.userRepository.findOneBy({
      phone: body.phone,
    });
    if (user) {
      // 签发token
      const redis = await this.redisService.getRedis();
      const pv =
        Number(await redis.get(`admin:passwordVersion:${user.id}`)) || 1;
      const jwtSign = this.jwtService.sign({
        uid: user.id,
        pv,
      });
      // const perms = await this.menuService.getPerms(user.id);
      const perms = [];
      await redis.set(`admin:passwordVersion:${user.id}`, pv);
      await redis.set(`admin:token:${user.id}`, jwtSign, 'EX', 60 * 60 * 24);
      await redis.set(`admin:perms:${user.id}`, JSON.stringify(perms));
      await this.logService.saveLoginLog(user.id, this.utils.getReqIP(req), ua);
      return {
        token: jwtSign,
        user_info: user,
      };
    } else {
      // 注册账号
      await this.userRepository.insert({
        phone: body.phone,
        departmentId: 1,
        name: '',
        username: '',
        password: '',
        psalt: '',
      });
    }
  }

  @Get('/api/v1.index/get_user_info')
  @PermissionOptional()
  async getUserInfo(@User() user) {
    return this.userRepository.findOneBy({ id: user.id });
  }
}
