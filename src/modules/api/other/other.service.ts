import { Injectable } from '@nestjs/common';
import { CreateOtherDto } from './dto/create-other.dto';
import { UpdateOtherDto } from './dto/update-other.dto';

@Injectable()
export class OtherService {
  create(createOtherDto: CreateOtherDto) {
    return 'This action adds a new other';
  }

  findAll() {
    return `This action returns all other`;
  }

  findOne(id: number) {
    return `This action returns a #${id} other`;
  }

  update(id: number, updateOtherDto: UpdateOtherDto) {
    return `This action updates a #${id} other`;
  }

  remove(id: number) {
    return `This action removes a #${id} other`;
  }
}
