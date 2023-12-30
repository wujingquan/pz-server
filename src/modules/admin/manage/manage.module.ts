import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { BannerModule } from './banner/banner.module';
import { CouponModule } from './coupon/coupon.module';
import { CouponLogModule } from './couponLog/couponLog.module';
import { OrderModule } from './order/order.module';
import { CityModule } from './city/city.module';
import { HospitalModule } from './hosiptal/hospital.module';
import { ADMIN_PREFIX } from '@/modules/admin/admin.constants';
import { ServerTypeModule } from '@/modules/admin/manage/serverType/serverType.module';
import { ServerModule } from '@/modules/admin/manage/server/server.module';

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
      {
        path: ADMIN_PREFIX + '/manage',
        children: [{ path: 'couponLog', module: CouponLogModule }],
      },
      {
        path: ADMIN_PREFIX + '/manage',
        children: [{ path: 'order', module: OrderModule }],
      },
      {
        path: ADMIN_PREFIX + '/manage',
        children: [{ path: 'city', module: CityModule }],
      },
      {
        path: ADMIN_PREFIX + '/manage',
        children: [{ path: 'hospital', module: HospitalModule }],
      },
      {
        path: ADMIN_PREFIX + '/manage',
        children: [{ path: 'serverType', module: ServerTypeModule }],
      },
      {
        path: ADMIN_PREFIX + '/manage',
        children: [{ path: 'server', module: ServerModule }],
      },
    ]),
    BannerModule,
    CouponModule,
    CouponLogModule,
    OrderModule,
    CityModule,
    HospitalModule,
    ServerTypeModule,
    ServerModule,
  ],
  controllers: [],
  providers: [],
})
export class ManageModule {}
