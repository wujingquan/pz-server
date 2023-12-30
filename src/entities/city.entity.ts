import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'city' })
export default class City extends BaseEntity {
  @Column()
  @ApiProperty({
    description: '城市名称',
  })
  city_name: string;

  @Column()
  @ApiProperty({
    description: '状态',
  })
  status: number;

  @Column()
  @ApiProperty({
    description: '排序值',
  })
  weight: number;
}
