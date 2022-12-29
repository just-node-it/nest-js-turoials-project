import { Animal } from '@prisma/client';

export interface AnimalWithClassificationTree {
  animal: Animal;
  classificationTree: string[];
}
