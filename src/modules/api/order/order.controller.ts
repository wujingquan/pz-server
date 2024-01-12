import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import dayjs from 'dayjs';
import { customAlphabet } from 'nanoid';
import Order from '@/entities/order.entity';
import { User } from '@/common/decorators/user.decorator';
import { PermissionOptional } from '@/modules/admin/core/decorators/permission-optional.decorator';
import Server from '@/entities/server.entity';
import { Page } from '@/common/decorators/page.decorator';
import Hospital from '@/entities/hospital.entity';

@Controller('/api/v1.order')
export class OrderController {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Server) private serverRepository: Repository<Server>,
  ) {}

  @Post('submit_order')
  @PermissionOptional()
  async submitOrder(@Body() body, @User() user) {
    // 生成订单号
    const nanoid = customAlphabet('0123456789', 6);
    const order_no = dayjs().format('YYYYMMDDHHmmss') + nanoid();
    console.log('order_no', order_no);
    const server = await this.serverRepository.findOneBy({
      id: body.server_id,
    });
    console.log(server);

    const order = this.orderRepository.create({
      ...body,
      order_no,
      user_id: user.uid,
      price: server.price,
      status: 0,
      total_price: 0,
    });
    console.log('order', order);
    await this.orderRepository.save(order);
    return order;
  }

  @Get('get_order_list')
  @PermissionOptional()
  @Page()
  getOrderList(@User('uid') uid: number, @Query() query) {
    return this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndMapOne(
        'order.hospital_info',
        Hospital,
        'hospital',
        'hospital.id=order.hospital_id',
      )
      .leftJoinAndMapOne(
        'order.server_info',
        Server,
        'server',
        'server.id=order.server_id',
      )
      .where({
        user_id: uid,
        status: query.status,
      })
      .getManyAndCount();
  }

  @Get('get_order_info')
  @PermissionOptional()
  @Page()
  getOrderInfo(@User('uid') uid: number, @Query('order_id') order_id: number) {
    return this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndMapOne(
        'order.hospital_info',
        Hospital,
        'hospital',
        'hospital.id=order.hospital_id',
      )
      .leftJoinAndMapOne(
        'order.server_info',
        Server,
        'server',
        'server.id=order.server_id',
      )
      .where({
        id: order_id,
        user_id: uid,
      })
      .getOne();
  }
}
