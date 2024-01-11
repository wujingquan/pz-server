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
  InfoDisclaimerDto,
  PageSearchUserDto,
  UpdateDisclaimerDto,
} from './disclaimer.dto';
import { PageSearchUserInfo, DisclaimerDetailInfo } from './disclaimer.class';
import { DisclaimerService } from './disclaimer.service';
import Disclaimer from '@/entities/disclaimer.entity';

@ApiSecurity(ADMIN_PREFIX)
@ApiTags('城市管理模块')
@Controller()
export class DisclaimerController {
  constructor(private disclaimerService: DisclaimerService) {}

  @Post('add')
  async add(@Body() dto: CreateEntityDto): Promise<void> {
    await this.disclaimerService.add(dto);
  }

  @ApiOperation({
    summary: '获取服务类型',
  })
  @ApiOkResponse({ type: DisclaimerDetailInfo })
  @Get('info')
  async info(@Query() dto: InfoDisclaimerDto): Promise<Disclaimer> {
    return await this.disclaimerService.info(dto.id);
  }

  @ApiOperation({
    summary: '分页获取陪诊订单列表',
  })
  @ApiOkResponse({ type: [PageSearchUserInfo] })
  @Post('page')
  async page(
    @Body() dto: PageSearchUserDto,
  ): Promise<PaginatedResponseDto<PageSearchUserInfo>> {
    const [list, total] = await this.disclaimerService.page(dto);
    console.log(list, total);
    return {
      list,
      pagination: {
        total,
        page: dto.page,
        size: dto.limit,
      },
    };
  }

  @ApiOperation({
    summary: '分页获取陪诊订单列表',
  })
  @ApiOkResponse({ type: [PageSearchUserInfo] })
  @Post('update')
  async update(@Body() dto: UpdateDisclaimerDto) {
    this.disclaimerService.update(dto);
  }

  @Post('delete')
  async delete(@Body() dto): Promise<void> {
    await this.disclaimerService.delete(dto.ids);
  }
}
