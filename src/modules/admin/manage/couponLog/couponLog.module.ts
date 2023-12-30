import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CounponLogService } from './couponLog.service';
import { CounponLogController } from './couponLog.controller';
import CouponLog from '@/entities/couponLog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CouponLog])],

  controllers: [CounponLogController],
  providers: [CounponLogService],
})
export class CouponLogModule {}
