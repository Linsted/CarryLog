import { ENV_PATHS } from '@carry/constants';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { RmqModule } from '@carry/rabbit-mq';
import { CommonAuthModule } from '@carry/auth';
import { getMongoConfig } from '@carry/helpers';

import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_PATHS.ORDER_SERVICE,
    }),
    CommonAuthModule,
    OrderModule,
    MongooseModule.forRootAsync(getMongoConfig()),
    RmqModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
