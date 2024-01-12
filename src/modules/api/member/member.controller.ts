import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/common/decorators/user.decorator';
import { PermissionOptional } from '@/modules/admin/core/decorators/permission-optional.decorator';
import Member from '@/entities/member.entity';
import Order from '@/entities/order.entity';
import { Page } from '@/common/decorators/page.decorator';

@Controller()
export class MemberController {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
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
}
