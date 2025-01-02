import { ENV_PATHS } from '@carry/constants';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CommonAuthModule } from '@carry/auth';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_PATHS.ORDER_SERVICE,
    }),
    CommonAuthModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
