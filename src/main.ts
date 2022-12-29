import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './shared/filters/prisma-exception/prisma-exception.filter';
import { TimeoutInterceptor } from './shared/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalFilters(new PrismaExceptionFilter());

  await app.listen(3000);
}
bootstrap();
