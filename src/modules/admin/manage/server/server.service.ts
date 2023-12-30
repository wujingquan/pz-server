import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Server from 'src/entities/server.entity';
import { Repository } from 'typeorm';
import { CreateEntityDto } from '@/modules/admin/manage/server/server.dto';

@Injectable()
export class ServerService {
  constructor(
    @InjectRepository(Server)
    private serverTypeRepository: Repository<Server>,
  ) {}

  async add(param: CreateEntityDto): Promise<void> {
    await this.serverTypeRepository.insert(param);
  }

  async page(): Promise<[any, number]> {
    return await this.serverTypeRepository.findAndCount();
  }

  async info(id) {
    return await this.serverTypeRepository.findOne({
      where: { id },
    });
  }
}
