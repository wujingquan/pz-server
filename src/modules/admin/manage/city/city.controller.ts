import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { PaginatedResponseDto } from 'src/common/class/res.class';
import { ADMIN_PREFIX } from '../../admin.constants';
import { CreateEntityDto, InfoCityDto, PageSearchUserDto } from './city.dto';
import { PageSearchUserInfo, CityDetailInfo } from './city.class';
import { CityService } from './city.service';
import City from '@/entities/city.entity';

@ApiSecurity(ADMIN_PREFIX)
@ApiTags('城市管理模块')
@Controller()
export class CityController {
  constructor(private cityService: CityService) {}

  @Post('add')
  async add(@Body() dto: CreateEntityDto): Promise<void> {
    await this.cityService.add(dto);
  }

  @ApiOperation({
    summary: '获取陪诊订单详情',
  })
  @ApiOkResponse({ type: CityDetailInfo })
  @Get('info')
  async info(@Query() dto: InfoCityDto): Promise<City> {
    return await this.cityService.info(dto.id);
  }

  @ApiOperation({
    summary: '分页获取陪诊订单列表',
  })
  @ApiOkResponse({ type: [PageSearchUserInfo] })
  @Post('page')
  async page(
    @Body() dto: PageSearchUserDto,
  ): Promise<PaginatedResponseDto<PageSearchUserInfo>> {
    const [list, total] = await this.cityService.page();
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
