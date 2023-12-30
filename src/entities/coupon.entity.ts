import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'coupon' })
export default class Coupon extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  coupon_type: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  price: number;

  @Column()
  @ApiProperty()
  low_limit_price: number;

  @Column()
  @ApiProperty()
  expire_type: number;

  @Column()
  @ApiProperty()
  validity_day: number;

  @Column({
    nullable: true,
    default: null,
  })
  @ApiProperty()
  validity_start_time?: number;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  validity_end_time?: number;

  @Column()
  @ApiProperty()
  draw_limit: number;

  @Column()
  @ApiProperty()
  grant: number;

  @Column({
    default: 0,
  })
  @ApiProperty()
  already_grant: number;

  @Column()
  @ApiProperty()
  content: string;

  @Column()
  @ApiProperty()
  status: number;

  @Column()
  @ApiProperty()
  image: string;

  // 已使用总数量
  @Column({
    default: 0,
  })
  @ApiProperty()
  use_grant: number;
}
