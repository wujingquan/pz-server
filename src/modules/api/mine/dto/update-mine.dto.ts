import { PartialType } from '@nestjs/swagger';
import { CreateMineDto } from './create-mine.dto';

export class UpdateMineDto extends PartialType(CreateMineDto) {}
