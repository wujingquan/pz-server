import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { PaginatedResponseDto } from 'src/common/class/res.class';
import { ADMIN_PREFIX } from '../../admin.constants';
import {
  CreateEntityDto,
  InfoServerDto,
  PageSearchUserDto,
} from './server.dto';
import { PageSearchUserInfo, ServerDetailInfo } from './server.class';
import { ServerService } from './server.service';
import Server from '@/entities/server.entity';

@ApiSecurity(ADMIN_PREFIX)
@ApiTags('城市管理模块')
@Controller()
export class ServerController {
  constructor(private serverService: ServerService) {}

  @Post('add')
  async add(@Body() dto: CreateEntityDto): Promise<void> {
    await this.serverService.add(dto);
  }

  @ApiOperation({
    summary: '获取服务类型',
  })
  @ApiOkResponse({ type: ServerDetailInfo })
  @Get('info')
  async info(@Query() dto: InfoServerDto): Promise<Server> {
    return await this.serverService.info(dto.id);
  }

  @ApiOperation({
    summary: '分页获取陪诊订单列表',
  })
  @ApiOkResponse({ type: [PageSearchUserInfo] })
  @Post('page')
  async page(
    @Body() dto: PageSearchUserDto,
  ): Promise<PaginatedResponseDto<PageSearchUserInfo>> {
    const [list, total] = await this.serverService.page();
    return {
      list,
      pagination: {
        total,
        page: dto.page,
        size: dto.limit,
      },
    };
  }
}
