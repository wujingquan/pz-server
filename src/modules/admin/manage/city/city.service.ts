import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import City from 'src/entities/city.entity';
import { Repository } from 'typeorm';
import { CreateEntityDto } from '@/modules/admin/manage/city/city.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async add(param: CreateEntityDto): Promise<void> {
    await this.cityRepository.insert({
      city_name: param.city_name,
      status: param.status,
      weight: param.weight,
    });
  }

  async page(): Promise<[any, number]> {
    return await this.cityRepository.findAndCount();
  }

  async info(id) {
    return await this.cityRepository.findOne({
      where: { id },
    });
  }
}
