import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'coupon_log' })
export default class CouponLog extends BaseEntity {
  @Column()
  @ApiProperty({
    description: '优惠券Id',
  })
  coupon_id: number;

  @Column()
  @ApiProperty({
    description: '优惠券编码',
  })
  coupon_no: string;

  @Column()
  @ApiProperty({
    description: '用户Id',
  })
  user_id: number;

  @Column({
    nullable: true,
  })
  @ApiProperty({
    description: '使用订单Id',
  })
  order_id: number;

  @Column()
  @ApiProperty({
    description: '优惠券类型',
  })
  coupon_type: number;

  @Column()
  @ApiProperty({
    description: '名称',
  })
  name: string;

  @Column()
  @ApiProperty({
    description: '减免金额',
  })
  price: number;

  @Column()
  @ApiProperty({
    description: '最低消费金额',
  })
  low_limit_price: number;

  @Column()
  @ApiProperty({
    description: '有效开始时间',
  })
  validity_start_time: number;

  @Column()
  @ApiProperty({
    description: '有效结束时间',
  })
  validity_end_time: number;

  @Column()
  @ApiProperty()
  content: string;

  @Column()
  @ApiProperty({
    description: '使用状态',
  })
  status: number;

  @Column()
  @ApiProperty({
    description: '创建时间',
  })
  create_time: number;

  @Column()
  @ApiProperty({
    description: '更新时间',
  })
  update_time: number;

  @Column()
  @ApiProperty({
    description: '领取方式',
  })
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
