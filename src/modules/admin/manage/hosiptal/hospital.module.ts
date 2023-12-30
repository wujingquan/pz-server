import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalService } from './hospital.service';
import { HospitalController } from './hospital.controller';
import Hospital from '@/entities/hospital.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hospital])],

  controllers: [HospitalController],
  providers: [HospitalService],
})
export class HospitalModule {}
