import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import Member from '@/entities/member.entity';
import Order from '@/entities/order.entity';
import Withdrawal from '@/entities/withdrawal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Order, Withdrawal])],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
