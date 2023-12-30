import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Coupon from 'src/entities/coupon.entity';
import { Repository } from 'typeorm';
import { CreateEntityDto } from './coupon.dto';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon) private bannerRepository: Repository<Coupon>,
  ) {}

  async add(param: CreateEntityDto): Promise<void> {
    await this.bannerRepository.insert({
      name: param.name,
      content: param.content,
      coupon_type: param.coupon_type,
      validity_day: param.validity_day,
      price: param.price,
      low_limit_price: param.low_limit_price,
      expire_type: param.expire_type,
      validity_start_time: param.validity_start_time,
      validity_end_time: param.validity_end_time,
      draw_limit: param.draw_limit,
      grant: param.grant,
      status: param.status,
      image: param.image,
    });
  }

  async page(): Promise<[any, number]> {
    return await this.bannerRepository.findAndCount();
  }

  async delete(ids: number[]) {
    await this.bannerRepository.delete(ids);
  }

  async info(id) {
    return await this.bannerRepository.findOne({
      where: { id },
    });
  }
}
