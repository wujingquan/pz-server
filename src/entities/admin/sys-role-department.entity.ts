import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'sys_role_department' })
export default class SysRoleDepartment extends BaseEntity {
  @Column({ name: 'role_id' })
  @ApiProperty()
  roleId: number;

  @Column({ name: 'department_id' })
  @ApiProperty()
  departmentId: number;
}
