import { ApiProperty } from '@nestjs/swagger';
import Withdrawal from '@/entities/city.entity';

export class withdrawalInfo {
  @ApiProperty()
  title: string;
}

export class PageSearchUserInfo {
  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  title: string;
}

export class WithdrawalDetailInfo extends Withdrawal {}
