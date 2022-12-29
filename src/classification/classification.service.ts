import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClassificationDto, UpdateClassificationDto } from './dto';

@Injectable()
export class ClassificationService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.classification.findMany();
  }

  async findOne(classificationId: number) {
    const classification = await this.prisma.classification.findUnique({
      where: {
        id: classificationId,
      },
    });

    if (!classification) {
      throw new NotFoundException();
    }
    return classification;
  }

  async create(dto: CreateClassificationDto) {
    return this.prisma.classification.create({
      data: {
        ...dto,
      },
    });
  }

  async delete(classificationId: number) {
    return this.prisma.classification.delete({
      where: {
        id: classificationId,
      },
    });
  }

  async update(classificationId: number, dto: UpdateClassificationDto) {
    return this.prisma.classification.update({
      where: {
        id: classificationId,
      },
      data: {
        ...dto,
      },
    });
  }

  async findTree(classificationId: number) {
    const classificationTree: [CreateClassificationDto] = await this.prisma
      .$queryRaw`WITH RECURSIVE classificationTree AS(
          SELECT id, "parentCategoryId", name
          FROM classifications 
          WHERE id = ${classificationId}
          UNION
          SELECT
              c.id, c."parentCategoryId", c.name
          FROM
              classifications c
          INNER JOIN classificationTree t ON t."parentCategoryId" = c.id
        ) SELECT * FROM classificationTree`;
    const treeReversedOrder = classificationTree.map(
      (classification) => classification.name,
    );
    return treeReversedOrder.reverse();
  }
}
