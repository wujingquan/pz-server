import { Injectable } from '@nestjs/common';
import { CreateMineDto } from './dto/create-mine.dto';
import { UpdateMineDto } from './dto/update-mine.dto';

@Injectable()
export class MineService {
  create(createMineDto: CreateMineDto) {
    return 'This action adds a new mine';
  }

  findAll() {
    return `This action returns all mine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mine`;
  }

  update(id: number, updateMineDto: UpdateMineDto) {
    return `This action updates a #${id} mine`;
  }

  remove(id: number) {
    return `This action removes a #${id} mine`;
  }
}
