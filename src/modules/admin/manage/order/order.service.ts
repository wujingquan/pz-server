import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Order from 'src/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async page(): Promise<[any, number]> {
    return await this.orderRepository.findAndCount();
  }

  async info(id) {
    return await this.orderRepository.findOne({
      where: { id },
    });
  }
}
