import { ApiProperty } from '@nestjs/swagger';
import Server from '@/entities/city.entity';

export class ServerInfo {
  @ApiProperty()
  title: string;
}

export class PageSearchUserInfo {
  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  title: string;
}

export class ServerDetailInfo extends Server {}
