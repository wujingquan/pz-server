import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { IsNumber, Min } from 'class-validator';
import { BaseEntity } from './base.entity';

const defaultValue = {
  audit_status: 0,
};

@Entity({ name: 'withdrawal' })
export default class Withdrawal extends BaseEntity {
  @Column()
  @ApiProperty({
    description: '提现单号',
  })
  order_no: string;

  @Column()
  @ApiProperty({
    description: '陪诊师ID',
  })
  member_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty({
    description: '提现金额',
  })
  @Min(0.0001)
  @IsNumber()
  money: number;

  @Column({ nullable: true })
  @ApiProperty({
    description: '审核状态',
  })
  audit_status: null | number = null; // null 待审核, 1， 审核通过， 2， 审核不通过

  @Column({ nullable: true, default: null })
  @ApiProperty({
    description: '审核时间',
  })
  audit_time: Date;

  @Column()
  client_type: number; // 1 APP， 2 微信小程序，3 web
}
