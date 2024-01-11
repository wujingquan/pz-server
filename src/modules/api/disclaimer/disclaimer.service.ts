import { Injectable } from '@nestjs/common';
import { CreateDisclaimerDto } from './dto/create-disclaimer.dto';
import { UpdateDisclaimerDto } from './dto/update-disclaimer.dto';

@Injectable()
export class DisclaimerService {
  create(createDisclaimerDto: CreateDisclaimerDto) {
    return 'This action adds a new disclaimer';
  }

  findAll() {
    return `This action returns all disclaimer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} disclaimer`;
  }

  update(id: number, updateDisclaimerDto: UpdateDisclaimerDto) {
    return `This action updates a #${id} disclaimer`;
  }

  remove(id: number) {
    return `This action removes a #${id} disclaimer`;
  }
}
