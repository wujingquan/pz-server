import { Module } from '@nestjs/common';
import { HomeModule } from './home/home.module';
import { OrderModule } from './order/order.module';
import { CouponModule } from './coupon/coupon.module';
import { MineModule } from './mine/mine.module';
import { OtherModule } from './other/other.module';

@Module({
  imports: [HomeModule, OrderModule, CouponModule, MineModule, OtherModule],
})
export class ApiModule {}
