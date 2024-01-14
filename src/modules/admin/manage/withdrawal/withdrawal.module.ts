import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WithdrawalService } from './withdrawal.service';
import { WithdrawalController } from './withdrawal.controller';
import Withdrawal from '@/entities/withdrawal.entity';
import Member from '@/entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Withdrawal, Member])],

  controllers: [WithdrawalController],
  providers: [WithdrawalService],
})
export class WithdrawalModule {}
