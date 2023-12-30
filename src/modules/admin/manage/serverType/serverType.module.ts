import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerTypeService } from './serverType.service';
import { ServerTypeController } from './serverType.controller';
import ServerType from '@/entities/serverType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServerType])],

  controllers: [ServerTypeController],
  providers: [ServerTypeService],
})
export class ServerTypeModule {}
