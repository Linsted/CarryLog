import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthGuard, CommonAuthModule } from '@carry/auth';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './providers/order.repository';
import { Order, OrderSchema } from './models/order.model';

@Module({
  controllers: [OrderController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    OrderService,
    OrderRepository,
  ],
  exports: [],
  imports: [
    CommonAuthModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
})
export class OrderModule {}
