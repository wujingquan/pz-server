import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Hospital from '@/entities/hospital.entity';
import { CreateEntityDto } from '@/modules/admin/manage/hosiptal/hospital.dto';

@Injectable()
export class HospitalService {
  constructor(
    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,
  ) {}

  async add(param: CreateEntityDto): Promise<void> {
    console.log(param);
    await this.hospitalRepository.insert({
      ...param,
    });
  }

  async page(): Promise<[any, number]> {
    return await this.hospitalRepository.findAndCount();
  }

  async info(id) {
    return await this.hospitalRepository.findOne({
      where: { id },
    });
  }
}
