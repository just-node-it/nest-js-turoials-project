import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpositionDto, UpdateExpositionDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exposition } from '@prisma/client';

@Injectable()
export class ExpositionService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.exposition.findMany();
  }

  async findOne(expositionId: number) {
    const exposition: Exposition = await this.prisma.exposition.findUnique({
      where: {
        id: expositionId,
      },
    });

    if (!exposition) {
      throw new NotFoundException();
    }
    return exposition;
  }

  async create(dto: CreateExpositionDto) {
    return this.prisma.exposition.create({
      data: {
        ...dto,
      },
    });
  }

  async delete(expositionId: number) {
    return this.prisma.exposition.delete({
      where: {
        id: expositionId,
      },
    });
  }

  async update(expositionId: number, dto: UpdateExpositionDto) {
    return this.prisma.exposition.update({
      where: {
        id: expositionId,
      },
      data: {
        ...dto,
      },
    });
  }
}
