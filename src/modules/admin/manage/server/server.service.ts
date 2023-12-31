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

  async page(args): Promise<[any, number]> {
    const where = {};
    if (args.hospital_id) {
      where['hospital_id'] = args.hospital_id;
    }
    return await this.serverTypeRepository.findAndCount({
      where,
    });
  }

  async info(id) {
    return await this.serverTypeRepository.findOne({
      where: { id },
    });
  }
}
