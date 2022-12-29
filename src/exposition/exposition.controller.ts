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
import { Exposition } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { CreateExpositionDto, UpdateExpositionDto } from './dto';
import { ExpositionService } from './exposition.service';

@Controller('expositions')
export class ExpositionController {
  constructor(private readonly expositionService: ExpositionService) {}

  @Get()
  async findExpositions(): Promise<Exposition[]> {
    return this.expositionService.findAll();
  }

  @Get(':id')
  async findExposition(
    @Param('id', ParseIntPipe) expositionId: number,
  ): Promise<Exposition> {
    return this.expositionService.findOne(expositionId);
  }

  @UseGuards(JwtGuard)
  @Post()
  async createExposition(
    @Body() dto: CreateExpositionDto,
  ): Promise<Exposition> {
    return this.expositionService.create(dto);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteExposition(@Param('id', ParseIntPipe) expositionId: number) {
    return this.expositionService.delete(expositionId);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async updateExposition(
    @Param('id', ParseIntPipe) expositionId: number,
    @Body() dto: UpdateExpositionDto,
  ): Promise<Exposition> {
    return this.expositionService.update(expositionId, dto);
  }
}
