import { ApiProperty } from '@nestjs/swagger';
import Disclaimer from '@/entities/city.entity';

export class DisclaimerInfo {
  @ApiProperty()
  title: string;
}

export class PageSearchUserInfo {
  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  title: string;
}

export class DisclaimerDetailInfo extends Disclaimer {}
