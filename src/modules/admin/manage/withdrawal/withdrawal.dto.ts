import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsInt,
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
  // @ApiProperty({
  //   description: '服务类型名称',
  // })
  // @IsString()
  // name: string;
  // @ApiProperty({
  //   description: '服务类型图标',
  // })
  // @IsString()
  // images: string;
}

export class UpdateUserDto extends CreateEntityDto {
  @ApiProperty({
    description: '用户ID',
  })
  @IsInt()
  @Min(0)
  id: number;
}

export class InfoWithdrawalDto {
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

export class PageSearchUserDto extends PageOptionsDto {}

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
