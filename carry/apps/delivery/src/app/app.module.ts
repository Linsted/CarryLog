import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { ENV_PATHS } from '@carry/constants';
import { CommonAuthModule } from '@carry/auth';
import { RmqModule } from '@carry/rabbit-mq';
import { MessagingService } from './providers/messaging.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_PATHS.DELIVERY_SERVICE,
    }),
    CommonAuthModule,
    RmqModule,
  ],
  controllers: [],
  providers: [MessagingService],
})
export class AppModule {}
