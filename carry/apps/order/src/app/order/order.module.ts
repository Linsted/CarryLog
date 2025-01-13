import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { AuthGuard, CommonAuthModule } from '@carry/auth';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './providers/order.repository';
import { Order, OrderSchema } from './models/order.model';
import { PublishService } from './providers/publish.service';

@Module({
  controllers: [OrderController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    OrderService,
    OrderRepository,
    PublishService,
  ],
  exports: [],
  imports: [
    CommonAuthModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ScheduleModule.forRoot(),
  ],
})
export class OrderModule {}
