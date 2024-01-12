import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import Order from '@/entities/order.entity';
import Server from '@/entities/server.entity';
import Hospital from '@/entities/hospital.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Server, Hospital])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
