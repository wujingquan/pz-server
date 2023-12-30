import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'order' })
export default class Order extends BaseEntity {
  @Column()
  @ApiProperty({
    description: '优惠券编码',
  })
  order_no: string;

  @Column()
  @ApiProperty({ description: '城市ID' })
  city_id: number;

  @Column()
  @ApiProperty({ description: '医院ID' })
  hospital_id: string;

  @Column()
  @ApiProperty({
    description: '服务类型Id',
  })
  server_id: number;

  @Column()
  @ApiProperty()
  visit_time: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  mobile: string;

  @Column()
  @ApiProperty()
  remark: string;

  @Column()
  @ApiProperty({
    description: '用户ID',
  })
  user_id: number;

  @Column({
    nullable: true,
    default: null,
  })
  @ApiProperty({
    description: '陪诊师ID',
  })
  member_id?: string;

  @Column({
    nullable: true,
    default: null,
  })
  @ApiProperty({
    description: '接单时间',
  })
  receiving_time: string;

  @Column()
  @ApiProperty()
  price: string;

  @Column()
  @ApiProperty()
  status: string;

  @Column({
    nullable: true,
    default: null,
  })
  @ApiProperty()
  payment_time: string;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  cancel_time: string;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  finished_time: string;

  @Column()
  @ApiProperty()
  transaction_id: string;

  @Column()
  @ApiProperty()
  address: string;

  @Column()
  @ApiProperty()
  age: string;

  @Column()
  @ApiProperty()
  night_other_money: string;

  @Column()
  @ApiProperty()
  total_price: string;

  @Column()
  @ApiProperty()
  coupon_log_id: string;

  @Column()
  @ApiProperty()
  coupon_price: string;

  @Column()
  @ApiProperty()
  sum_price: string;

  @Column()
  @ApiProperty()
  visit_time_text: string;

  @Column()
  @ApiProperty()
  receiving_time_text: string;

  @Column()
  @ApiProperty()
  create_time_text: string;

  @Column()
  @ApiProperty()
  payment_time_text: string;

  @Column()
  @ApiProperty()
  cancel_time_text: string;

  @Column()
  @ApiProperty()
  finished_time_text: string;
}
