import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'sys_department' })
export default class SysDepartment extends BaseEntity {
  @Column({ name: 'parent_id', nullable: true })
  @ApiProperty()
  parentId: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ name: 'order_num', type: 'int', nullable: true, default: 0 })
  @ApiProperty()
  orderNum: number;
}
