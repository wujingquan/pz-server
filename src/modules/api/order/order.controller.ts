import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import dayjs from 'dayjs';
import { customAlphabet, nanoid } from 'nanoid';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Authorize } from '@/modules/admin/core/decorators/authorize.decorator';
import Order from '@/entities/order.entity';

@Controller('/api/v1.order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }

  @Post('submit_order')
  @Authorize()
  async submitOrder(@Body() body) {
    // 生成订单号
    const nanoid = customAlphabet('0123456789', 6);
    const order_no = dayjs().format('YYYYMMDDHHmmss') + nanoid();
    console.log('order_no', order_no);
    const { city_id, hospital_id, server_id, visit_time, yuyuetime } = body;

    const order = this.orderRepository.create({
      // ...body,
      order_no,
      user_id: 1,
      city_id,
      hospital_id,
      server_id,
      visit_time,
    });
    console.log('order', order);
    await this.orderRepository.save(order);
    return order;
  }
}
