import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'banner' })
export default class Banner extends BaseEntity {
  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  image: string;

  @Column()
  @ApiProperty()
  status: number;

  @Column()
  @ApiProperty()
  weight: string;
}
