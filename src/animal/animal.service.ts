import { Injectable, NotFoundException } from '@nestjs/common';
import { Animal } from '@prisma/client';
import { ClassificationService } from 'src/classification/classification.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateAnimalDto,
  EditAnimalDto,
  FindAnimalQueryDto,
  FindAnimalsQueryDto,
} from './dto';

@Injectable()
export class AnimalService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly classificationService: ClassificationService,
  ) {}

  async findAll(query: FindAnimalsQueryDto) {
    const queryObject: { where?: object; orderBy?: object; include: object } = {
      // include all fields for specific relations
      include: {
        classification: true,
        employee: true,
      },
    };
    if ('sort' in query) {
      queryObject.orderBy = {
        dateArrived: query.sort, // sort by dateArrived as we agreed
      };
    }

    if ('classificationId' in query) {
      queryObject.where = {
        classification: {
          id: query.classificationId, // filter list of relation
        },
      };
    }

    if ('age' in query) {
      const ageFilters = {};
      Object.keys(query.age).forEach((key) => {
        ageFilters[key] = query.age[key];
      });

      queryObject.where = {
        ...queryObject.where,
        age: ageFilters,
      };
    }

    if (query.photo) {
      const queryPhoto = query.photo
        ? { NOT: [{ photo: null }] }
        : { photo: null };
      queryObject.where = { ...queryObject.where, ...queryPhoto };
    }

    if (query.parentsIncluded) {
      queryObject.include = {
        ...queryObject.include,
        parents: {
          select: {
            parent: true,
          },
        },
      };
    }

    if (query.childrenIncluded) {
      queryObject.include = {
        ...queryObject.include,
        children: {
          select: {
            child: true,
          },
        },
      };
    }

    return this.prisma.animal.findMany(queryObject);
  }

  async findOne(animalId: number, query: FindAnimalQueryDto) {
    const queryObject: { where: object; include: object } = {
      where: { id: animalId },
      include: { classification: true, employee: true },
    };

    if (query.parentsIncluded) {
      queryObject.include = {
        ...queryObject.include,
        parents: {
          select: {
            parent: true,
          },
        },
      };
    }

    if (query.childrenIncluded) {
      queryObject.include = {
        ...queryObject.include,
        children: {
          select: {
            child: true,
          },
        },
      };
    }

    const animal: Animal = await this.prisma.animal.findUnique(queryObject);
    if (!animal) {
      throw new NotFoundException();
    }

    if (query.classificationTree) {
      let classificationTree: string[] = [];
      classificationTree = await this.classificationService.findTree(
        animal.classificationId,
      );
      return { animal, classificationTree };
    }
    return animal;
  }

  async create(dto: CreateAnimalDto) {
    const includeObject = { classification: true, employee: true };
    const { parents, children, ...data } = dto;
    if (!parents && !children) {
      return this.prisma.animal.create({
        data: dto,
        include: includeObject,
      });
    }
    return this.prisma.$transaction(async (trx) => {
      const animal = await trx.animal.create({ data, include: includeObject });
      const animalRelations = [];
      if (parents) {
        for (const parent of parents) {
          const parentsRelation = await trx.parentChild.create({
            data: { parentId: parent, childId: animal.id },
          });
          animalRelations.push({ parent: parentsRelation });
        }
      }
      if (children) {
        for (const child of children) {
          const childrenRelations = await trx.parentChild.create({
            data: { parentId: animal.id, childId: child },
          });
          animalRelations.push({ child: childrenRelations });
        }
      }
      return { ...animal, relations: animalRelations };
    });
  }

  async update(animalId: number, dto: EditAnimalDto) {
    return this.prisma.animal.update({
      where: {
        id: animalId,
      },
      data: dto,
    });
  }

  async delete(animalId: number) {
    return this.prisma.animal.delete({
      where: {
        id: animalId,
      },
    });
  }

  async addChild(animalId: number, childId: number) {
    return this.prisma.parentChild.create({
      data: {
        parentId: animalId,
        childId,
      },
    });
  }

  async addParent(animalId: number, parentId: number) {
    return this.prisma.parentChild.create({
      data: {
        parentId,
        childId: animalId,
      },
    });
  }

  async deleteChild(animalId: number, childId: number) {
    return this.prisma.parentChild.delete({
      where: {
        // compound key
        parentId_childId: {
          parentId: animalId,
          childId,
        },
      },
    });
  }

  async deleteParent(animalId: number, parentId: number) {
    return this.prisma.parentChild.delete({
      where: {
        // compound key
        parentId_childId: {
          parentId,
          childId: animalId,
        },
      },
    });
  }
}
