import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

const defaultValue = {
  money: 0,
};

@Entity({ name: 'member' })
export default class Member extends BaseEntity {
  @Column()
  @ApiProperty({
    description: '审核时间',
  })
  audit_time: string;

  @Column()
  @ApiProperty({
    description: '头像',
  })
  avatar: string;

  @Column()
  @ApiProperty({
    description: '所属城市',
  })
  city_id: string;

  @Column()
  @ApiProperty({
    description: '性别',
  })
  gender: string;

  @Column()
  @ApiProperty({
    description: '身份证号码',
  })
  idcard: string;

  @Column()
  @ApiProperty({
    description: '身份证照片正面',
  })
  idcard_images_one: string;

  @Column()
  @ApiProperty({
    description: '身份证照片背面',
  })
  idcard_images_two: string;

  @Column()
  @ApiProperty({
    description: '手机号码',
  })
  mobile: string;

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty({
    description: '余额',
  })
  money: number = defaultValue.money;

  @Column()
  @ApiProperty({
    description: '姓名',
  })
  name: string;

  @Column()
  @ApiProperty({
    description: '状态',
  })
  status: string;

  @Column()
  @ApiProperty({
    description: '用户ID',
  })
  user_id: number;
}
