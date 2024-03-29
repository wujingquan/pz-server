import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import Banner from '@/entities/admin/banner.entity';
import Consumer from '@/entities/consumer.entity';
import City from '@/entities/city.entity';
import Hospital from '@/entities/hospital.entity';
import Server from '@/entities/server.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Banner, Consumer, City, Hospital, Server]),
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
