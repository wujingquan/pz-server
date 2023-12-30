import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'attachment' })
export default class Attachment extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  type: string;

  @Column()
  @ApiProperty()
  dest: string;

  @Column()
  @ApiProperty()
  encoding: string;

  @Column()
  @ApiProperty()
  mimetype: string;

  @Column()
  @ApiProperty()
  filename: string;

  @Column()
  @ApiProperty()
  originalFilename: string;

  @Column()
  @ApiProperty()
  path: string;
}
