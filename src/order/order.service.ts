import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStateEnum } from './enums';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.order.findMany();
  }

  async findOne(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      throw new NotFoundException();
    }
    return order;
  }

  async create(dto: CreateOrderDto) {
    const { orderItems, ...data } = dto;
    return this.prisma.order.create({
      data: {
        ...data,
        // nested writes
        orderItems: {
          create: orderItems,
        },
      },
    });
  }

  async updateState(orderId: number, newState: OrderStateEnum) {
    if (newState === OrderStateEnum.NEW) {
      throw new BadRequestException(
        `${newState} state is unacceptable. See the order state flow.`,
      );
    }
    const order: Order = await this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (
      order.state === OrderStateEnum.FINISHED ||
      order.state === OrderStateEnum.REJECTED ||
      (order.state === OrderStateEnum.NEW &&
        newState === OrderStateEnum.FINISHED)
    ) {
      throw new BadRequestException(
        'Unexpected state transit. See the order state flow.',
      );
    }
    return this.prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        state: newState,
      },
    });
  }
}
