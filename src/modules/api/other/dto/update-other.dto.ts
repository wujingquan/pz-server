import { PartialType } from '@nestjs/swagger';
import { CreateOtherDto } from './create-other.dto';

export class UpdateOtherDto extends PartialType(CreateOtherDto) {}
