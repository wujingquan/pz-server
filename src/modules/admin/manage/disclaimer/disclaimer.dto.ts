import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsInt, Min } from 'class-validator';
import { PageOptionsDto } from '../../../../common/dto/page.dto';
import Disclaimer from '@/entities/disclaimer.entity';

export class UpdateDisclaimerDto extends Disclaimer {
  @IsInt()
  @Min(0)
  declare id: number;
}

export class InfoDisclaimerDto {
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
    description: '需要删除的服务条款ID列表',
    type: [Number],
  })
  @IsArray()
  @ArrayNotEmpty()
  ids: number[];
}

export class PageSearchUserDto extends PageOptionsDto {}
