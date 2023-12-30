import { ApiProperty } from '@nestjs/swagger';
import CounponLog from '@/entities/coupon.entity';

export class CounponLogInfo {
  @ApiProperty()
  title: string;
}

export class PageSearchUserInfo {
  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  title: string;
}

export class CounponLogDetailInfo extends CounponLog {}
