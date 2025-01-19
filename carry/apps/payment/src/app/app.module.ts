import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { RmqModule } from '@carry/rabbit-mq';

import { PaymentModule } from './payment/payment.module';
import { GlobalLoggingMiddleware } from './payment/middlewares/log.middleware';

@Module({
  imports: [PaymentModule, RmqModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GlobalLoggingMiddleware).forRoutes('*');
  }
}
