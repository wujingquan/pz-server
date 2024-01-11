import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtherService } from './other.service';
import { OtherController } from './other.controller';
import SysUser from '@/entities/admin/sys-user.entity';
import { SystemModule } from '@/modules/admin/system/system.module';

@Module({
  imports: [TypeOrmModule.forFeature([SysUser]), SystemModule],
  controllers: [OtherController],
  providers: [OtherService],
})
export class OtherModule {}
