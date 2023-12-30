import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { Repository } from 'typeorm';
import {
  DiskStorageFile,
  FileInterceptor,
  UploadedFile,
} from '@wujingquan/nest-file-fastify';
import { normalize } from 'upath';
import { UploadService } from './upload.service';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { Authorize } from '@/modules/admin/core/decorators/authorize.decorator';
import Attachment from '@/entities/attachment.entity';
import { PageSearchUserInfo } from '@/modules/admin/system/user/user.class';

@Controller('attachment')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    @InjectRepository(Attachment)
    private attachmentRepository: Repository<Attachment>,
  ) {}

  @Post()
  @Authorize()
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
    }),
  )
  async create(@UploadedFile() file: DiskStorageFile) {
    const attachment = this.attachmentRepository.create({
      type: 'disk',
      ...file,
      path: normalize(file.path),
    });
    await this.attachmentRepository.save(attachment);
    return attachment;
  }

  @Get()
  @Authorize()
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }

  @ApiOperation({
    summary: '分页轮播图列表',
  })
  @ApiOkResponse({ type: [PageSearchUserInfo] })
  @Post('page')
  async page(@Body() dto) {
    const [list, total] = await this.uploadService.page();
    return {
      list,
      pagination: {
        total,
        page: dto.page,
        size: dto.limit,
      },
    };
  }
}
