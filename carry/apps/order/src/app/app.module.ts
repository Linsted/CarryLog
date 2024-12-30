import { ENV_PATHS } from '@carry/constants';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_PATHS.ORDER_SERVICE,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
