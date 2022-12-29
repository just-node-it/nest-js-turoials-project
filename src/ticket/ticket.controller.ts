import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Ticket } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { CreateTicketDto, EditTicketDto } from './dto';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  findTickets(): Promise<Ticket[]> {
    return this.ticketService.findAll();
  }

  @Get(':id')
  findTicket(@Param('id', ParseIntPipe) ticketId: number): Promise<Ticket> {
    return this.ticketService.findOne(ticketId);
  }

  @UseGuards(JwtGuard)
  @Post()
  createTicket(@Body() dto: CreateTicketDto): Promise<Ticket> {
    return this.ticketService.create(dto);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  editTicket(
    @Param('id', ParseIntPipe) ticketId: number,
    @Body() dto: EditTicketDto,
  ): Promise<Ticket> {
    return this.ticketService.update(ticketId, dto);
  }
}
