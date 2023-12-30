import { Module } from '@nestjs/common';
import { OtherService } from './other.service';
import { OtherController } from './other.controller';

@Module({
  controllers: [OtherController],
  providers: [OtherService],
})
export class OtherModule {}
