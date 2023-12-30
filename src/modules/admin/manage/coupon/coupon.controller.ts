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
  InfoCouponDto,
  PageSearchUserDto,
} from './coupon.dto';
import { PageSearchUserInfo, CouponDetailInfo } from './coupon.class';
import { CouponService } from './coupon.service';

@ApiSecurity(ADMIN_PREFIX)
@ApiTags('轮播图模块')
@Controller()
export class CouponController {
  constructor(private couponService: CouponService) {}

  @ApiOperation({
    summary: '新增优惠券',
  })
  @Post('add')
  async add(@Body() dto: CreateEntityDto): Promise<void> {
    await this.couponService.add(dto);
  }

  @ApiOperation({
    summary: '查询轮播图信息',
  })
  @ApiOkResponse({ type: CouponDetailInfo })
  @Get('info')
  async info(@Query() dto: InfoCouponDto): Promise<CouponDetailInfo> {
    return await this.couponService.info(dto.id);
  }

  @ApiOperation({
    summary: '删除',
  })
  @Post('delete')
  async delete(@Body() dto: DeleteEntityDto): Promise<void> {
    await this.couponService.delete(dto.ids);
  }

  @ApiOperation({
    summary: '分页轮播图列表',
  })
  @ApiOkResponse({ type: [PageSearchUserInfo] })
  @Post('page')
  async page(
    @Body() dto: PageSearchUserDto,
  ): Promise<PaginatedResponseDto<PageSearchUserInfo>> {
    const [list, total] = await this.couponService.page();
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
