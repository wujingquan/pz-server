import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Disclaimer from 'src/entities/disclaimer.entity';
import { Repository } from 'typeorm';
import { PageSearchUserDto } from '@/modules/admin/manage/disclaimer/disclaimer.dto';

@Injectable()
export class DisclaimerService {
  constructor(
    @InjectRepository(Disclaimer)
    private disclaimerRepository: Repository<Disclaimer>,
  ) {}

  async add(param: Disclaimer): Promise<void> {
    await this.disclaimerRepository.insert(param);
  }

  async page(dto: PageSearchUserDto): Promise<[any, number]> {
    return this.disclaimerRepository.findAndCount({
      take: dto.limit,
      skip: (dto.page - 1) * dto.limit,
    });
  }

  async info(id) {
    return await this.disclaimerRepository.findOne({
      where: { id },
    });
  }

  async update(dto) {
    this.disclaimerRepository.update(
      {
        id: dto.id,
      },
      dto,
    );
  }

  async delete(ids) {
    await this.disclaimerRepository.delete(ids);
  }
}
