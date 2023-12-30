import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'server' })
export default class Server extends BaseEntity {
  @Column()
  @ApiProperty({
    description: '图标',
  })
  images: string;

  @Column()
  @ApiProperty({
    description: '服务名称',
  })
  server_name: string;

  @Column()
  @ApiProperty({
    description: '介绍说明',
  })
  content: string;

  @Column()
  @ApiProperty({
    description: '价格',
  })
  price: number;

  @Column()
  @ApiProperty({
    description: '状态',
  })
  status: number;

  @Column()
  @ApiProperty({
    description: '排序值',
  })
  weigh: number;

  @Column()
  @ApiProperty({
    description: '医院ID',
  })
  hospital_id: number;

  @Column()
  @ApiProperty({
    description: '是否打折',
  })
  have_discount: number;

  @Column()
  @ApiProperty({
    description: '折扣价',
  })
  discount_price: number;

  @Column()
  @ApiProperty({
    description: '是否有启夜间额外服务费',
  })
  have_night_server: number;

  @Column()
  @ApiProperty({
    description: '夜间开始时间',
  })
  night_start_time: string;

  @Column()
  @ApiProperty({
    description: '夜间结束时间',
  })
  night_end_time: string;

  @Column()
  @ApiProperty({
    description: '夜间额外服务费(元)',
  })
  night_other_money: number;
}
