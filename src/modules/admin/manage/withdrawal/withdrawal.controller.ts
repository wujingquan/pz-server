import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { PaginatedResponseDto } from 'src/common/class/res.class';
import { ADMIN_PREFIX } from '../../admin.constants';
import { PageSearchUserDto } from './withdrawal.dto';
import { PageSearchUserInfo } from './withdrawal.class';
import { WithdrawalService } from './withdrawal.service';

@ApiSecurity(ADMIN_PREFIX)
@ApiTags('城市管理模块')
@Controller()
export class WithdrawalController {
  constructor(private withdrawalService: WithdrawalService) {}

  @ApiOperation({
    summary: '分页提现列表',
  })
  @ApiOkResponse({ type: [PageSearchUserInfo] })
  @Post('page')
  async page(
    @Body() dto: PageSearchUserDto,
  ): Promise<PaginatedResponseDto<PageSearchUserInfo>> {
    const [list, total] = await this.withdrawalService.page();
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
  @Post('process')
  async processAuditStatus(@Body() dto) {
    return this.withdrawalService.process(dto);
  }
}
