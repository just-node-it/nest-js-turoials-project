import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { EventService } from './event.service';
import { Event } from '@prisma/client';
import { CreateEventDto, UpdateEventDto } from './dto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async findEvents(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Get(':id')
  async findEvent(@Param('id', ParseIntPipe) eventId: number): Promise<Event> {
    return this.eventService.findOne(eventId);
  }

  @UseGuards(JwtGuard)
  @Post()
  async createEvent(@Body() dto: CreateEventDto): Promise<Event> {
    return this.eventService.create(dto);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteEvent(@Param('id', ParseIntPipe) eventId: number) {
    return this.eventService.delete(eventId);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async updateEvent(
    @Param('id', ParseIntPipe) eventId: number,
    @Body() dto: UpdateEventDto,
  ): Promise<Event> {
    return this.eventService.update(eventId, dto);
  }
}
