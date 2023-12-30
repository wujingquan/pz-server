import { ApiProperty } from '@nestjs/swagger';
import Banner from '@/entities/admin/banner.entity';

export class BannerInfo {
  @ApiProperty()
  title: string;
}

export class PageSearchUserInfo {
  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  title: string;
}

export class BannerDetailInfo extends Banner {}
