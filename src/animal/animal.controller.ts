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
  Query,
  UseGuards,
} from '@nestjs/common';
import { Animal, ParentChild } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { AnimalWithClassificationTree } from './animal.interface';
import { AnimalService } from './animal.service';
import {
  CreateAnimalDto,
  EditAnimalDto,
  FindAnimalQueryDto,
  FindAnimalsQueryDto,
} from './dto';

@Controller('animals')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @UseGuards(JwtGuard)
  @Post()
  createAnimal(@Body() dto: CreateAnimalDto): Promise<Animal> {
    return this.animalService.create(dto);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  editAnimal(
    @Param('id', ParseIntPipe) animalId: number,
    @Body() dto: EditAnimalDto,
  ): Promise<Animal> {
    return this.animalService.update(animalId, dto);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteAnimal(@Param('id', ParseIntPipe) animalId: number) {
    return this.animalService.delete(animalId);
  }

  @Get(':id')
  findAnimal(
    @Param('id', ParseIntPipe) animalId: number,
    @Query() query: FindAnimalQueryDto,
  ): Promise<Animal | AnimalWithClassificationTree> {
    return this.animalService.findOne(animalId, query);
  }

  @Get()
  findAnimals(
    @Query()
    query: FindAnimalsQueryDto,
  ): Promise<Animal[]> {
    return this.animalService.findAll(query);
  }

  @UseGuards(JwtGuard)
  @Post(':id/child/:childId')
  addChild(
    @Param('id', ParseIntPipe) animalId: number,
    @Param('childId', ParseIntPipe) childId: number,
  ): Promise<ParentChild> {
    return this.animalService.addChild(animalId, childId);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/child/:childId')
  removeChild(
    @Param('id', ParseIntPipe) animalId: number,
    @Param('childId', ParseIntPipe) childId: number,
  ) {
    return this.animalService.deleteChild(animalId, childId);
  }

  @UseGuards(JwtGuard)
  @Post(':id/parent/:parentId')
  addParent(
    @Param('id', ParseIntPipe) animalId: number,
    @Param('parentId', ParseIntPipe) parentId: number,
  ): Promise<ParentChild> {
    return this.animalService.addParent(animalId, parentId);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/parent/:parentId')
  removeParent(
    @Param('id', ParseIntPipe) animalId: number,
    @Param('parentId', ParseIntPipe) parentId: number,
  ) {
    return this.animalService.deleteParent(animalId, parentId);
  }
}
