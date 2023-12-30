import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'consumer' })
export default class Consumer extends BaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  age: number;

  @Column()
  @ApiProperty()
  introduction: string;

  @Column()
  @ApiProperty()
  gender: number;

  @Column()
  @ApiProperty()
  city: string;

  @Column()
  @ApiProperty()
  skills: string;

  @Column()
  @ApiProperty()
  mobile: string;
}
