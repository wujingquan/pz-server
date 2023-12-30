import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { PaginatedResponseDto } from 'src/common/class/res.class';
import { ADMIN_PREFIX } from '../../admin.constants';
import {
  CreateEntityDto,
  InfoEntityDto,
  PageSearchUserDto,
} from './hospital.dto';
import { PageSearchUserInfo, HospitalDetailInfo } from './hospital';
import { HospitalService } from './hospital.service';
import Hospital from '@/entities/hospital.entity';

@ApiSecurity(ADMIN_PREFIX)
@ApiTags('陪诊订单模块')
@Controller()
export class HospitalController {
  constructor(private hospitalService: HospitalService) {}

  @Post('add')
  async add(@Body() dto: CreateEntityDto): Promise<void> {
    await this.hospitalService.add(dto);
  }

  @ApiOperation({
    summary: '获取陪诊订单详情',
  })
  @ApiOkResponse({ type: HospitalDetailInfo })
  @Get('info')
  async info(@Query() dto: InfoEntityDto): Promise<Hospital> {
    return await this.hospitalService.info(dto.id);
  }

  @ApiOperation({
    summary: '分页获取陪诊订单列表',
  })
  @ApiOkResponse({ type: [PageSearchUserInfo] })
  @Post('page')
  async page(
    @Body() dto: PageSearchUserDto,
  ): Promise<PaginatedResponseDto<PageSearchUserInfo>> {
    const [list, total] = await this.hospitalService.page();
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
