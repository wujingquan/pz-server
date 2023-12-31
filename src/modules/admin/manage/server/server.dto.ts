import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { isEmpty } from 'lodash';
import { PageOptionsDto } from '../../../../common/dto/page.dto';

export class UpdateUserInfoDto {
  @ApiProperty({
    required: false,
    description: '用户呢称',
  })
  @IsString()
  @IsOptional()
  nickName: string;

  @ApiProperty({
    required: false,
    description: '用户邮箱',
  })
  @IsEmail()
  @ValidateIf((o) => !isEmpty(o.email))
  email: string;

  @ApiProperty({
    required: false,
    description: '用户手机号',
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    required: false,
    description: '用户备注',
  })
  @IsString()
  @IsOptional()
  remark: string;
}

export class UpdatePasswordDto {
  @ApiProperty({
    description: '更改前的密码',
  })
  @IsString()
  @MinLength(6)
  @Matches(/^[a-z0-9A-Z`~!#%^&*=+\\|{};:'\\",<>/?]+$/)
  originPassword: string;

  @ApiProperty({
    description: '更改后的密码',
  })
  @MinLength(6)
  @Matches(/^[a-z0-9A-Z`~!#%^&*=+\\|{};:'\\",<>/?]+$/)
  newPassword: string;
}

export class CreateEntityDto {
  @IsString()
  server_name: string;

  @IsString()
  images: string;

  @IsString()
  content: string;

  @IsNumber()
  price: number;

  @IsNumber()
  status: number;

  @IsNumber()
  weigh: number;

  @IsNumber()
  hospital_id: number;

  @IsNumber()
  have_discount: number;

  @IsNumber()
  discount_price: number;

  @IsNumber()
  have_night_server: number;

  @IsString()
  night_start_time: string;

  @IsString()
  night_end_time: string;

  @IsNumber()
  night_other_money: number;
}

export class UpdateUserDto extends CreateEntityDto {
  @ApiProperty({
    description: '用户ID',
  })
  @IsInt()
  @Min(0)
  id: number;
}

export class InfoServerDto {
  @ApiProperty({
    description: '轮播图ID',
  })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  id: number;
}

export class DeleteEntityDto {
  @ApiProperty({
    description: '需要删除的轮播图ID列表',
    type: [Number],
  })
  @IsArray()
  @ArrayNotEmpty()
  ids: number[];
}

export class PageSearchUserDto extends PageOptionsDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  hospital_id?: number;
}

export class PasswordUserDto {
  @ApiProperty({
    description: '管理员ID',
  })
  @IsInt()
  @Min(0)
  userId: number;

  @ApiProperty({
    description: '更改后的密码',
  })
  @Matches(/^[a-z0-9A-Z`~!#%^&*=+\\|{};:'\\",<>/?]+$/)
  password: string;
}
