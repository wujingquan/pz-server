import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'sys_config' })
export default class SysConfig extends BaseEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  @ApiProperty()
  key: string;

  @Column({ type: 'varchar', length: 50 })
  @ApiProperty()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  value: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  remark: string;
}
