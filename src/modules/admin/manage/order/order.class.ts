import { ApiProperty } from '@nestjs/swagger';
import Order from '@/entities/coupon.entity';

export class OrderInfo {
  @ApiProperty()
  title: string;
}

export class PageSearchUserInfo {
  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  title: string;
}

export class OrderDetailInfo extends Order {}
