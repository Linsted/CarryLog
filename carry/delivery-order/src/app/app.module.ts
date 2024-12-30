import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ENV_PATHS } from '@carry/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_PATHS.DELIVERY_ORDER_SERVICE,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
