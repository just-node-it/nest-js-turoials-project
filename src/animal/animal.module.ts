import { Module } from '@nestjs/common';
import { ClassificationModule } from 'src/classification/classification.module';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';

@Module({
  controllers: [AnimalController],
  providers: [AnimalService],
  imports: [ClassificationModule],
})
export class AnimalModule {}
