import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, isNumberString } from 'class-validator';
import { Transform } from 'class-transformer';
import { toNumber } from 'lodash';

export class LoginDto {
  @ApiProperty({
    description: '手机号码',
  })
  @IsNumberString()
  phone: string;

  @ApiProperty({
    description: '验证码',
  })
  @Transform((o) => {
    return isNumberString(o.value) ? toNumber(o.value) : o.value;
  })
  @IsNumber()
  code: number;
}
