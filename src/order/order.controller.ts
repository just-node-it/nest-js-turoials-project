import {
  Body,
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Order } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStateEnum } from './enums';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtGuard)
  @Get()
  findOrders(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOrder(@Param('id', ParseIntPipe) orderId: number): Promise<Order> {
    return this.orderService.findOne(orderId);
  }

  @Post()
  createOrder(@Body() dto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(dto);
  }

  @UseGuards(JwtGuard)
  @Put(':id/state')
  changeOrderStatus(
    @Param('id', ParseIntPipe) orderId: number,
    @Body('state', new ParseEnumPipe(OrderStateEnum)) state: OrderStateEnum,
  ): Promise<Order> {
    return this.orderService.updateState(orderId, state);
  }
}
