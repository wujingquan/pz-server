import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { BannerModule } from './banner/banner.module';
import { CouponModule } from './coupon/coupon.module';
import { ADMIN_PREFIX } from '@/modules/admin/admin.constants';

@Module({
  imports: [
    RouterModule.register([
      {
        path: ADMIN_PREFIX + '/manage',
        children: [{ path: 'banner', module: BannerModule }],
      },
      {
        path: ADMIN_PREFIX + '/manage',
        children: [{ path: 'coupon', module: CouponModule }],
      },
    ]),
    BannerModule,
    CouponModule,
  ],
  controllers: [],
  providers: [],
})
export class ManageModule {}
