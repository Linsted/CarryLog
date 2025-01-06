import { ENV_PATHS } from '@carry/constants';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { CommonAuthModule } from '@carry/auth';
import { OrderModule } from './order/order.module';
import { getMongoConfig } from '@carry/helpers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_PATHS.ORDER_SERVICE,
    }),
    CommonAuthModule,
    OrderModule,
    MongooseModule.forRootAsync(getMongoConfig()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
