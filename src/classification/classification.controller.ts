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
import { Classification } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { ClassificationService } from './classification.service';
import { CreateClassificationDto, UpdateClassificationDto } from './dto';

@Controller('classifications')
export class ClassificationController {
  constructor(private readonly classificationService: ClassificationService) {}

  @Get()
  async findClassifications(): Promise<Classification[]> {
    return this.classificationService.findAll();
  }

  @Get(':id')
  async findClassification(
    @Param('id', ParseIntPipe) classificationId: number,
  ): Promise<Classification> {
    return this.classificationService.findOne(classificationId);
  }

  @UseGuards(JwtGuard)
  @Post()
  createClassification(
    @Body() dto: CreateClassificationDto,
  ): Promise<Classification> {
    return this.classificationService.create(dto);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteClassification(@Param('id', ParseIntPipe) classificationId: number) {
    return this.classificationService.delete(classificationId);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  updateClassification(
    @Param('id', ParseIntPipe) classificationId: number,
    @Body() dto: UpdateClassificationDto,
  ): Promise<Classification> {
    return this.classificationService.update(classificationId, dto);
  }

  @Get(':id/tree')
  findClassificationTree(
    @Param('id', ParseIntPipe) classificationId: number,
  ): Promise<string[]> {
    return this.classificationService.findTree(classificationId);
  }
}
