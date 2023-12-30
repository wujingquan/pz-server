import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'serverType' })
export default class ServerType extends BaseEntity {
  @Column()
  @ApiProperty({
    description: '图标',
  })
  images: string;

  @Column()
  @ApiProperty({
    description: '服务名称',
  })
  name: string;
}
