import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OtherService } from './other.service';
import { CreateOtherDto } from './dto/create-other.dto';
import { UpdateOtherDto } from './dto/update-other.dto';

@Controller('other')
export class OtherController {
  constructor(private readonly otherService: OtherService) {}

  @Post()
  create(@Body() createOtherDto: CreateOtherDto) {
    return this.otherService.create(createOtherDto);
  }

  @Get()
  findAll() {
    return this.otherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.otherService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOtherDto: UpdateOtherDto) {
    return this.otherService.update(+id, updateOtherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.otherService.remove(+id);
  }
}
