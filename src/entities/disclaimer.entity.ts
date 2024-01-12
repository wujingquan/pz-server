import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { IsIn, IsString } from 'class-validator';
import { BaseEntity } from './base.entity';

const defaultValue = {
  status: 1,
};

@Entity({ name: 'disclaimer' })
export default class Disclaimer extends BaseEntity {
  @Column()
  @ApiProperty({
    description: '标题',
  })
  @IsString()
  title: string;

  @Column({
    type: 'longtext',
  })
  @ApiProperty({
    description: '内容',
  })
  @IsString()
  content: string;

  @Column({ default: defaultValue.status })
  @ApiProperty({
    description: '状态',
  })
  @IsIn([0, 1])
  status: number = defaultValue.status;

  @Column()
  @ApiProperty({
    description: '唯一标志',
  })
  @IsString()
  pointer: string;
}
