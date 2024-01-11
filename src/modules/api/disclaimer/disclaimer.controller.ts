import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DisclaimerService } from './disclaimer.service';
import { CreateDisclaimerDto } from './dto/create-disclaimer.dto';
import { UpdateDisclaimerDto } from './dto/update-disclaimer.dto';
import { Page } from '@/common/decorators/page.decorator';
import { Authorize } from '@/modules/admin/core/decorators/authorize.decorator';
import Disclaimer from '@/entities/disclaimer.entity';
import {
  queryDisclaimerDetailDto,
  queryDisclaimerDto,
} from '@/modules/api/disclaimer/dto/dto';

@Controller('/api/v1.disclaimer')
export class DisclaimerController {
  constructor(
    private readonly disclaimerService: DisclaimerService,
    @InjectRepository(Disclaimer)
    private disclaimerRepository: Repository<Disclaimer>,
  ) {}

  @Post()
  create(@Body() createDisclaimerDto: CreateDisclaimerDto) {
    return this.disclaimerService.create(createDisclaimerDto);
  }

  @Get()
  findAll() {
    return this.disclaimerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.disclaimerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDisclaimerDto: UpdateDisclaimerDto,
  ) {
    return this.disclaimerService.update(+id, updateDisclaimerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disclaimerService.remove(+id);
  }

  @Get('get_disclaimer_list')
  @Authorize()
  @Page()
  getDisclaimerList(@Query() query: queryDisclaimerDto) {
    return this.disclaimerRepository.findAndCount({
      skip: query.offset,
      take: query.limit,
    });
  }

  @Get('get_disclaimer_info')
  @Authorize()
  getDisclaimerInfo(@Query() query: queryDisclaimerDetailDto) {
    return this.disclaimerRepository.findOneBy({ id: query.id });
  }
}
