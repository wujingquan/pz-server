import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import dayjs from 'dayjs';
import { customAlphabet } from 'nanoid';
import Decimal from 'decimal.js';
import { User } from '@/common/decorators/user.decorator';
import { PermissionOptional } from '@/modules/admin/core/decorators/permission-optional.decorator';
import Member from '@/entities/member.entity';
import Order from '@/entities/order.entity';
import { Page } from '@/common/decorators/page.decorator';
import Withdrawal from '@/entities/withdrawal.entity';
import { ApiPageOptionsDto } from '@/common/dto/page.dto';

@Controller()
export class MemberController {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Withdrawal)
    private withdrawalRepo: Repository<Withdrawal>,
    private dataSource: DataSource,
  ) {}

  @Get('/api/v1.member/get_member_info')
  @PermissionOptional()
  async getMemeberInfo(@User() user) {
    return this.memberRepository.findOneBy({ user_id: user.uid });
  }

  @Get('/api/v1.member/get_order_list')
  @PermissionOptional()
  @Page()
  async getOrderList(@User() user, @Query() query) {
    const where = {};
    if (query.status === 4) {
      where['status'] = query.status;
      where['user_id'] = user.uid;
    } else if (query.status === 3) {
      if (query.status === 4) {
        where['status'] = query.status;
        where['user_id'] = user.uid;
      }
    } else if (query.status) {
      where['status'] = query.status;
    }
    return this.orderRepository.findAndCount({
      where,
      skip: query.offset,
      take: query.limit,
    });
  }

  @Post('/api/v1.consumer/submit_apply')
  @PermissionOptional()
  async comsumerSubmitApply(@User() user, @Body() body) {
    this.memberRepository.insert({
      ...body,
      audit_time: '',
      status: 1,
      money: 0,
      user_id: user.uid,
    });
  }

  // 提现
  @Post('/api/v1.member/refund_money')
  @PermissionOptional()
  async memberRefundMoney(@User('uid') uid, @Body() body: Withdrawal) {
    // 1. 检查是否有足够的余额
    // 2. 生成提现记录
    // 减去提现中的金额

    const member = await this.memberRepository.findOneBy({ user_id: uid });
    if (!member) {
      throw new BadRequestException('陪诊师不存在');
    }
    if (body.money > member.money) {
      throw new BadRequestException('余额不足');
    }

    const newMoney = Decimal.sub(member.money, body.money);
    member.money = newMoney.toNumber();
    console.log(member.money);
    const nanoid = customAlphabet('0123456789', 6);
    const order_no = dayjs().format('YYYYMMDDHHmmss') + nanoid();
    const withdrawal = this.withdrawalRepo.create({
      order_no,
      member_id: member.id,
      money: body.money,
    });

    // 事务
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(member);
      await queryRunner.manager.save(withdrawal);
      await queryRunner.commitTransaction();
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('提现失败');
    } finally {
      await queryRunner.release();
    }
  }

  @Get('/api/v1.member/get_refund_list')
  @PermissionOptional()
  @Page()
  async memberGetRefundList(
    @User('uid') uid: number,
    @Query() query: ApiPageOptionsDto,
  ) {
    const member = await this.memberRepository.findOneBy({ user_id: uid });
    if (!member) {
      throw new BadRequestException('陪诊师不存在');
    }
    return this.withdrawalRepo.findAndCount({
      where: {
        member_id: member.id,
      },
      skip: query.offset,
      take: query.limit,
    });
  }
}
