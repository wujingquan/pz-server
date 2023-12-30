import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
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

export class CreateBannerDto {
  @ApiProperty({
    description: '标题',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: '图片',
  })
  @IsString()
  image: string;

  @ApiProperty({
    description: '排序值',
  })
  @IsString()
  weight: string;

  @ApiProperty({
    description: '状态',
  })
  @IsNumber()
  status: number;
}

export class UpdateUserDto extends CreateBannerDto {
  @ApiProperty({
    description: '用户ID',
  })
  @IsInt()
  @Min(0)
  id: number;
}

export class InfoBannerDto {
  @ApiProperty({
    description: '轮播图ID',
  })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  id: number;
}

export class DeleteBannerDto {
  @ApiProperty({
    description: '需要删除的轮播图ID列表',
    type: [Number],
  })
  @IsArray()
  @ArrayNotEmpty()
  ids: number[];
}

export class PageSearchUserDto extends PageOptionsDto {
  @ApiProperty({
    required: false,
    description: 'Id',
    type: [Number],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  id: number[];

  @ApiProperty({
    required: false,
    description: '图片',
  })
  @IsString()
  @IsOptional()
  image = '';

  @ApiProperty({
    required: false,
    description: '排序值',
  })
  @IsString()
  @IsOptional()
  weight = '';

  @ApiProperty({
    required: false,
    description: '状态',
  })
  @IsString()
  @IsOptional()
  status = '';
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
