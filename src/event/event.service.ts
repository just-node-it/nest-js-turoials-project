import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.event.findMany();
  }
  async findOne(eventId: number) {
    const event: Event = await this.prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      throw new NotFoundException();
    }
    return event;
  }

  async create(dto: any) {
    return this.prisma.event.create({
      data: {
        ...dto,
      },
    });
  }

  async delete(eventId: number) {
    return this.prisma.event.delete({
      where: {
        id: eventId,
      },
    });
  }

  async update(eventId: number, dto: any) {
    return this.prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        ...dto,
      },
    });
  }
}
