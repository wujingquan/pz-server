import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, isNumberString } from 'class-validator';
import { Transform } from 'class-transformer';
import { toNumber } from 'lodash';
import { ApiPageOptionsDto } from '@/common/dto/page.dto';

export class queryDisclaimerDto extends ApiPageOptionsDto {
  @ApiProperty({
    description: '使用状态',
  })
  @Transform((o) => {
    return isNumberString(o.value) ? toNumber(o.value) : o.value;
  })
  @IsNumber()
  @IsOptional()
  status: number;
}

export class queryDisclaimerDetailDto {
  @ApiProperty({
    description: 'Id',
  })
  @Transform((o) => {
    return isNumberString(o.value) ? toNumber(o.value) : o.value;
  })
  @IsNumber()
  id: number;
}
