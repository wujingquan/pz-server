import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MineService } from './mine.service';
import { CreateMineDto } from './dto/create-mine.dto';
import { UpdateMineDto } from './dto/update-mine.dto';

@Controller('mine')
export class MineController {
  constructor(private readonly mineService: MineService) {}

  @Post()
  create(@Body() createMineDto: CreateMineDto) {
    return this.mineService.create(createMineDto);
  }

  @Get()
  findAll() {
    return this.mineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mineService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMineDto: UpdateMineDto) {
    return this.mineService.update(+id, updateMineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mineService.remove(+id);
  }
}
