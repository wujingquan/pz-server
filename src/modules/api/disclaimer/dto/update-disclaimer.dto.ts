import { PartialType } from '@nestjs/swagger';
import { CreateDisclaimerDto } from './create-disclaimer.dto';

export class UpdateDisclaimerDto extends PartialType(CreateDisclaimerDto) {}
