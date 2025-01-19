import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { GLOBAL_PREFIX } from '@carry/constants';
import { getValidationConfig } from '@carry/helpers';

import { AppModule } from './app/app.module';
import { GlobalExceptionFilter } from './app/payment/filters/golabal-exeption.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalPipes(new ValidationPipe(getValidationConfig()));
  app.useGlobalFilters(new GlobalExceptionFilter());

  const port = process.env.PAYMENT_PORT || 3003;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
  );
}

bootstrap();
