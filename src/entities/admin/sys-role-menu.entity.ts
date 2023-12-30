import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'sys_role_menu' })
export default class SysRoleMenu extends BaseEntity {
  @Column({ name: 'role_id' })
  @ApiProperty()
  roleId: number;

  @Column({ name: 'menu_id' })
  @ApiProperty()
  menuId: number;
}
