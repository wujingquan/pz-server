import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import Coupon from '@/entities/coupon.entity';
import CouponLog from '@/entities/couponLog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon, CouponLog])],
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule {}
