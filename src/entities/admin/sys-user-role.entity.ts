import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'sys_user_role' })
export default class SysUserRole extends BaseEntity {
  @Column({ name: 'user_id' })
  @ApiProperty()
  userId: number;

  @Column({ name: 'role_id' })
  @ApiProperty()
  roleId: number;
}
