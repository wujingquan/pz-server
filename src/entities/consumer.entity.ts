import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'consumer' })
export default class Consumer extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

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
