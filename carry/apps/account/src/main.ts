import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import session from 'express-session';
import passport from 'passport';

import { GLOBAL_PREFIX } from '@carry/constants';
import { getValidationConfig } from '@carry/helpers';

import { AppModule } from './app/app.module';
import { getSessionConfig } from './app/configs/mongo.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(session(getSessionConfig(configService)));
  app.use(passport.initialize());
  app.use(passport.session());
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalPipes(new ValidationPipe(getValidationConfig()));

  const port = process.env.ACCOUNT_PORT || 3000;

  await app.listen(port);
  Logger.log(
    `🚀 Accounts is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
  );
}

bootstrap();
