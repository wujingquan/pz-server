import { ApiProperty } from '@nestjs/swagger';
import ServerType from '@/entities/city.entity';

export class ServerTypeInfo {
  @ApiProperty()
  title: string;
}

export class PageSearchUserInfo {
  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  title: string;
}

export class ServerTypeDetailInfo extends ServerType {}
