import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isNumber } from 'lodash';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import Coupon from '@/entities/coupon.entity';
import { Authorize } from '@/modules/admin/core/decorators/authorize.decorator';
import CouponLog from '@/entities/couponLog.entity';
import { queryUserCouponDto } from '@/modules/api/coupon/dto/dto';
import { Page } from '@/common/decorators/page.decorator';
import { User } from '@/common/decorators/user.decorator';

@Controller('/api/v1.coupon')
export class CouponController {
  constructor(
    private readonly couponService: CouponService,
    @InjectRepository(Coupon) private couponRepository: Repository<Coupon>,
    @InjectRepository(CouponLog)
    private couponLogRepository: Repository<CouponLog>,
  ) {}

  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponService.create(createCouponDto);
  }

  @Get()
  findAll() {
    return this.couponService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponService.update(+id, updateCouponDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponService.remove(+id);
  }

  @Get('get_user_coupon_list')
  @Authorize()
  @Page()
  async getUserCouponList(
    @Query() query: queryUserCouponDto,
    @User('id') uid: number,
  ) {
    const where = {
      user_id: uid,
    };
    if (isNumber(query.status)) {
      where['status'] = query.status;
    }
    const [list, total] = await this.couponLogRepository.findAndCount({
      where,
      skip: query.offset,
      take: query.limit,
    });
    return {
      list,
      total,
    };
  }

  @Get('get_can_coupon_list')
  @Authorize()
  async getUserCanCouponList() {
    const [list, total] = await this.couponRepository.findAndCount();
    return {
      list,
      total,
    };
  }

  @Post('draw_coupon')
  @Authorize()
  async drawCoupon(@Body() body) {
    console.log('body', body);
    const { coupon_id } = body;
    const coupon = await this.couponRepository.findOneBy({ id: coupon_id });
    console.log('coupon', coupon);

    const couponLog = this.couponLogRepository.create({
      coupon_id: 1,
      coupon_no: '123',
      user_id: 1,
      order_id: null,
      coupon_type: coupon.coupon_type,
      name: coupon.name,
      price: coupon.price,
      low_limit_price: coupon.low_limit_price,
      validity_start_time: 123,
      validity_end_time: 456,
      validity_start_time_text: 'start',
      validity_end_time_text: 'end',
      content: coupon.content,
      status: 1,
      create_time: 123,
      update_time: 456,
      create_time_text: '123',
      update_time_text: '456',
      operate_type: 1,
    });
    await this.couponLogRepository.save(couponLog);
    return couponLog;
  }
}
