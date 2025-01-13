import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { ENV_PATHS } from '@carry/constants';

import { RmqService } from './rabbit-mq.service';
import {
  getConnectionsOptions,
  getRmqConfig,
  getRmqExchanges,
} from './config/rmq.config';

@Global()
@Module({
  controllers: [],
  providers: [RmqService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_PATHS.RABBIT_MQ,
    }),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: getRmqExchanges(),
      uri: getRmqConfig(),
      connectionInitOptions: getConnectionsOptions(),
    }),
  ],
  exports: [RabbitMQModule],
})
export class RmqModule {}
