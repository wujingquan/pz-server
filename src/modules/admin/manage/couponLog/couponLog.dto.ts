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
  @ApiProperty({
    description: '优惠券类型',
  })
  @IsNumber()
  coupon_type: number;

  @ApiProperty({
    description: '名称',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '减免金额',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: '最低消费金额',
  })
  @IsNumber()
  low_limit_price: number;

  @ApiProperty({
    description: '到期类型',
  })
  @IsNumber()
  expire_type: number;

  @ApiProperty({
    description: '有效天数',
  })
  @ValidateIf((o) => o.expire_type === 1)
  @IsNumber()
  validity_day: number;

  @ApiProperty({
    description: '开始时间',
  })
  @ValidateIf((o) => o.expire_type === 2)
  @IsNumber()
  validity_start_time: number;

  @ApiProperty({
    description: '结束时间',
  })
  @ValidateIf((o) => o.expire_type === 2)
  @IsNumber()
  validity_end_time: number;

  @ApiProperty({
    description: '每人领取限制张数',
  })
  @IsNumber()
  draw_limit: number;

  @ApiProperty({
    name: '总发放数量',
  })
  @IsNumber()
  grant: number;

  // @ApiProperty({
  //   name: '已发放数量',
  // })
  // @IsNumber()
  // already_grant: number;

  @ApiProperty({
    name: '卡券使用说明',
  })
  @IsString()
  content: string;

  @ApiProperty({
    name: '状态',
  })
  @IsNumber()
  status: number;

  @ApiProperty({
    name: '图标',
  })
  @IsString()
  image: string;

  // 已使用总数量
  // @ApiProperty({
  //   name: '已使用数量',
  // })
  // @IsNumber()
  // use_grant: number;
}

export class UpdateUserDto extends CreateEntityDto {
  @ApiProperty({
    description: '用户ID',
  })
  @IsInt()
  @Min(0)
  id: number;
}

export class InfoCounponLogDto {
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
