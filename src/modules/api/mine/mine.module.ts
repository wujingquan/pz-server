import { Module } from '@nestjs/common';
import { MineService } from './mine.service';
import { MineController } from './mine.controller';

@Module({
  controllers: [MineController],
  providers: [MineService],
})
export class MineModule {}
