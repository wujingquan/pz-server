import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Order from 'src/entities/order.entity';
import { Repository } from 'typeorm';
import Server from '@/entities/server.entity';
import Hospital from '@/entities/hospital.entity';
import City from '@/entities/city.entity';
import Member from '@/entities/member.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async page(): Promise<[any, number]> {
    return this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndMapOne('order.city', City, 'city', 'city.id=order.city_id')
      .leftJoinAndMapOne(
        'order.member',
        Member,
        'member',
        'member.id=order.member_id',
      )
      .leftJoinAndMapOne(
        'order.hospital',
        Hospital,
        'hospital',
        'hospital.id=order.hospital_id',
      )
      .leftJoinAndMapOne(
        'order.server',
        Server,
        'server',
        'server.id=order.server_id',
      )
      .getManyAndCount();
  }

  async info(id) {
    return await this.orderRepository.findOne({
      where: { id },
    });
  }
}
