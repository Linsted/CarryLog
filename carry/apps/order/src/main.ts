import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { GLOBAL_PREFIX } from '@carry/constants';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(GLOBAL_PREFIX);
  const port = process.env.ORDER_PORT || 3001;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
  );
}

bootstrap();
