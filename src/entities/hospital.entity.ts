import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'hospital' })
export default class Hospital extends BaseEntity {
  @Column()
  @ApiProperty({
    description: '医院名称',
  })
  hospital_name: string;

  @Column()
  @ApiProperty({
    description: '封面图',
  })
  images: string;

  @Column()
  @ApiProperty({
    description: '简短描述',
  })
  short_description: string;

  @Column()
  @ApiProperty({
    description: '医院简介',
  })
  content: string;

  @Column()
  @ApiProperty({
    description: '医院地址',
  })
  address: string;

  @Column()
  @ApiProperty({
    description: '状态',
  })
  status: number;

  @Column()
  @ApiProperty({
    description: '所属城市',
  })
  city_id: number;

  @Column()
  @ApiProperty({
    description: '排序值',
  })
  weight: number;
}
