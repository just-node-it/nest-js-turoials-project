import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExpositionModule } from './exposition/exposition.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeeModule } from './employee/employee.module';
import { ClassificationModule } from './classification/classification.module';
import { AnimalModule } from './animal/animal.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TicketModule } from './ticket/ticket.module';
import { OrderModule } from './order/order.module';
import { LoggerMiddleware } from './shared/middlewares/logger.midleware';
import { OrderController } from './order/order.controller';

@Module({
  imports: [
    ExpositionModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmployeeModule,
    ClassificationModule,
    AnimalModule,
    UserModule,
    AuthModule,
    TicketModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(OrderController);
  }
}
