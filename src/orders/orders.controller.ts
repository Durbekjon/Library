import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './orders.service';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Get()
  async getAll() {
    return this.orderService.getAll();
  }
  @Post('')
  async create(@Body() dto: OrderDto) {
    return this.orderService.create(dto);
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: OrderDto) {
    return this.orderService.update(id, dto);
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.orderService.delete(id);
  }
}
