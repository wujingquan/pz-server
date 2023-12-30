import { ApiProperty } from '@nestjs/swagger';
import Hospital from '@/entities/hospital.entity';

export class HospitalInfo {
  @ApiProperty()
  title: string;
}

export class PageSearchUserInfo {
  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  title: string;
}

export class HospitalDetailInfo extends Hospital {}
