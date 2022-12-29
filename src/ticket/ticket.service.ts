import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto, EditTicketDto } from './dto';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.ticket.findMany();
  }

  async findOne(ticketId: number) {
    const ticket = await this.prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },
    });
    if (!ticket) {
      throw new NotFoundException();
    }
    return ticket;
  }

  async create(dto: CreateTicketDto) {
    return this.prisma.ticket.create({
      data: dto,
    });
  }

  async update(ticketId: number, dto: EditTicketDto) {
    return this.prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: dto,
    });
  }
}
