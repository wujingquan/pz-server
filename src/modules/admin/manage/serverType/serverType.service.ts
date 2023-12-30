import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ServerType from 'src/entities/serverType.entity';
import { Repository } from 'typeorm';
import { CreateEntityDto } from '@/modules/admin/manage/serverType/serverType.dto';

@Injectable()
export class ServerTypeService {
  constructor(
    @InjectRepository(ServerType)
    private serverTypeRepository: Repository<ServerType>,
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
