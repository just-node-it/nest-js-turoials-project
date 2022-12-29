import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ExpositionController } from './exposition.controller';
import { ExpositionService } from './exposition.service';

@Module({
  controllers: [ExpositionController],
  providers: [ExpositionService],
  imports: [PrismaModule],
})
export class ExpositionModule {}
