import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'coupon_log' })
export default class CouponLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  coupon_id: number;

  @Column()
  @ApiProperty()
  coupon_no: string;

  @Column()
  @ApiProperty()
  user_id: number;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  order_id: number;

  @Column()
  @ApiProperty()
  coupon_type: number;

  @Column()
  @ApiProperty()
  name: string;

  // 减免金额
  @Column()
  @ApiProperty()
  price: number;

  // 最低消费金额
  @Column()
  @ApiProperty()
  low_limit_price: number;

  // 有效开始时间
  @Column()
  @ApiProperty()
  validity_start_time: number;

  // 有效结束时间
  @Column()
  @ApiProperty()
  validity_end_time: number;

  @Column()
  @ApiProperty()
  content: string;

  @Column()
  @ApiProperty()
  status: number;

  @Column()
  @ApiProperty()
  create_time: number;

  @Column()
  @ApiProperty()
  update_time: number;

  // 领取方式
  @Column()
  @ApiProperty()
  operate_type: number;

  @Column()
  @ApiProperty()
  validity_start_time_text: string;

  @Column()
  @ApiProperty()
  validity_end_time_text: string;

  @Column()
  @ApiProperty()
  create_time_text: string;

  @Column()
  @ApiProperty()
  update_time_text: string;
}
