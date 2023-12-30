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
  CreateBannerDto,
  DeleteBannerDto,
  InfoBannerDto,
  PageSearchUserDto,
} from './banner';
import { PageSearchUserInfo, BannerDetailInfo } from './banner.class';
import { BannerService } from './banner.service';

@ApiSecurity(ADMIN_PREFIX)
@ApiTags('轮播图模块')
@Controller()
export class BannerController {
  constructor(private bannerService: BannerService) {}

  @ApiOperation({
    summary: '新增轮播图',
  })
  @Post('add')
  async add(@Body() dto: CreateBannerDto): Promise<void> {
    await this.bannerService.add(dto);
  }

  @ApiOperation({
    summary: '查询轮播图信息',
  })
  @ApiOkResponse({ type: BannerDetailInfo })
  @Get('info')
  async info(@Query() dto: InfoBannerDto): Promise<BannerDetailInfo> {
    return await this.bannerService.info(dto.id);
  }

  @ApiOperation({
    summary: '删除',
  })
  @Post('delete')
  async delete(@Body() dto: DeleteBannerDto): Promise<void> {
    await this.bannerService.delete(dto.ids);
  }

  @ApiOperation({
    summary: '分页轮播图列表',
  })
  @ApiOkResponse({ type: [PageSearchUserInfo] })
  @Post('page')
  async page(
    @Body() dto: PageSearchUserDto,
  ): Promise<PaginatedResponseDto<PageSearchUserInfo>> {
    const [list, total] = await this.bannerService.page();
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
