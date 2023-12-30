import { ApiProperty } from '@nestjs/swagger';
import Coupon from '@/entities/coupon.entity';

export class CouponInfo {
  @ApiProperty()
  title: string;
}

export class PageSearchUserInfo {
  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  title: string;
}

export class CouponDetailInfo extends Coupon {}
