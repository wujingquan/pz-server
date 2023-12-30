import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CounponLog from 'src/entities/couponLog.entity';
import { Repository } from 'typeorm';
import { CreateEntityDto } from './couponLog.dto';

@Injectable()
export class CounponLogService {
  constructor(
    @InjectRepository(CounponLog)
    private couponLogRepository: Repository<CounponLog>,
  ) {}

  async add(param: CreateEntityDto): Promise<void> {
    await this.couponLogRepository.insert({
      name: param.name,
      content: param.content,
      coupon_type: param.coupon_type,
      // validity_day: param.validity_day,
      // price: param.price,
      // low_limit_price: param.low_limit_price,
      // expire_type: param.expire_type,
      // validity_start_time: param.validity_start_time,
      // validity_end_time: param.validity_end_time,
      // draw_limit: param.draw_limit,
      // grant: param.grant,
      // status: param.status,
      // image: param.image,
    });
  }

  async page(): Promise<[any, number]> {
    return await this.couponLogRepository.findAndCount();
  }

  async delete(ids: number[]) {
    await this.couponLogRepository.delete(ids);
  }

  async info(id) {
    return await this.couponLogRepository.findOne({
      where: { id },
    });
  }
}
