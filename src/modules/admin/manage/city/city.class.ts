import { ApiProperty } from '@nestjs/swagger';
import City from '@/entities/city.entity';

export class CityInfo {
  @ApiProperty()
  title: string;
}

export class PageSearchUserInfo {
  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  title: string;
}

export class CityDetailInfo extends City {}
