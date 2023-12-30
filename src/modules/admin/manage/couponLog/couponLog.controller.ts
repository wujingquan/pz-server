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
  DeleteEntityDto,
  InfoCounponLogDto,
  PageSearchUserDto,
} from './couponLog.dto';
import { PageSearchUserInfo, CounponLogDetailInfo } from './couponLog.class';
import { CounponLogService } from './couponLog.service';
import CounponLog from '@/entities/couponLog.entity';

@ApiSecurity(ADMIN_PREFIX)
@ApiTags('轮播图模块')
@Controller()
export class CounponLogController {
  constructor(private couponLogService: CounponLogService) {}

  @ApiOperation({
    summary: '新增优惠券',
  })
  @Post('add')
  async add(@Body() dto: CreateEntityDto): Promise<void> {
    await this.couponLogService.add(dto);
  }

  @ApiOperation({
    summary: '查询轮播图信息',
  })
  @ApiOkResponse({ type: CounponLogDetailInfo })
  @Get('info')
  async info(@Query() dto: InfoCounponLogDto): Promise<CounponLog> {
    return await this.couponLogService.info(dto.id);
  }

  @ApiOperation({
    summary: '删除',
  })
  @Post('delete')
  async delete(@Body() dto: DeleteEntityDto): Promise<void> {
    await this.couponLogService.delete(dto.ids);
  }

  @ApiOperation({
    summary: '分页轮播图列表',
  })
  @ApiOkResponse({ type: [PageSearchUserInfo] })
  @Post('page')
  async page(
    @Body() dto: PageSearchUserDto,
  ): Promise<PaginatedResponseDto<PageSearchUserInfo>> {
    console.log('debug 1');
    const [list, total] = await this.couponLogService.page();
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
