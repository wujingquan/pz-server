import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'disclaimer' })
export default class Disclaimer extends BaseEntity {
  @Column()
  @ApiProperty({
    description: '标题',
  })
  title: string;

  @Column({
    type: 'longtext',
  })
  @ApiProperty({
    description: '内容',
  })
  content: string;

  @Column()
  @ApiProperty({
    description: '状态',
  })
  status: number;

  @Column()
  @ApiProperty({
    description: '唯一标志',
  })
  pointer: string;
}
