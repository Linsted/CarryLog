import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthGuard, CommonAuthModule } from '@carry/auth';

import { OrderController } from './order.controller';

@Module({
  controllers: [OrderController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [],
  imports: [CommonAuthModule],
})
export class OrderModule {}
