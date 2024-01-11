import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisclaimerService } from './disclaimer.service';
import { DisclaimerController } from './disclaimer.controller';
import Disclaimer from '@/entities/disclaimer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Disclaimer])],

  controllers: [DisclaimerController],
  providers: [DisclaimerService],
})
export class DisclaimerModule {}
