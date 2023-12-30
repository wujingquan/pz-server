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
  InfoServerTypeDto,
  PageSearchUserDto,
} from './serverType.dto';
import { PageSearchUserInfo, ServerTypeDetailInfo } from './serverType.class';
import { ServerTypeService } from './serverType.service';
import ServerType from '@/entities/serverType.entity';

@ApiSecurity(ADMIN_PREFIX)
@ApiTags('城市管理模块')
@Controller()
export class ServerTypeController {
  constructor(private serverTypeService: ServerTypeService) {}

  @Post('add')
  async add(@Body() dto: CreateEntityDto): Promise<void> {
    await this.serverTypeService.add(dto);
  }

  @ApiOperation({
    summary: '获取服务类型',
  })
  @ApiOkResponse({ type: ServerTypeDetailInfo })
  @Get('info')
  async info(@Query() dto: InfoServerTypeDto): Promise<ServerType> {
    return await this.serverTypeService.info(dto.id);
  }

  @ApiOperation({
    summary: '分页获取陪诊订单列表',
  })
  @ApiOkResponse({ type: [PageSearchUserInfo] })
  @Post('page')
  async page(
    @Body() dto: PageSearchUserDto,
  ): Promise<PaginatedResponseDto<PageSearchUserInfo>> {
    const [list, total] = await this.serverTypeService.page();
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
