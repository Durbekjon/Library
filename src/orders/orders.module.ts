import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderService } from './orders.service';
import { OrderController } from './orders.controller';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
})
export class OrdersModule {}
