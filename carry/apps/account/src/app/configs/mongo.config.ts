import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import MongoStore from 'connect-mongo';
import { SessionOptions } from 'express-session';

import { ENVIRONMENT } from '@carry/constants';

import { STORE_COLLECTION_NAME } from '../utils/constants';

export function getMongoConfig(): MongooseModuleAsyncOptions {
  return {
    useFactory: (configService: ConfigService) => ({
      uri: getMongoString(configService),
    }),
    inject: [ConfigService],
    imports: [ConfigModule],
  };
}

export function getSessionConfig(configService: ConfigService): SessionOptions {
  return {
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
      mongoUrl: getMongoString(configService),
      collectionName: STORE_COLLECTION_NAME,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: Number(process.env.COOKIE_MAX_AGE),
      secure: process.env.NODE_ENV === ENVIRONMENT.PROD,
    },
  };
}

export function getMongoString(configService: ConfigService): string {
  const login = configService.get<string>('MONGO_LOGIN');
  const password = configService.get<string>('MONGO_PASSWORD');
  const host = configService.get<string>('MONGO_HOST');
  const port = configService.get<string>('MONGO_PORT');
  const database = configService.get<string>('MONGO_DATABASE');
  const authDatabase = configService.get<string>('MONGO_AUTHDATABASE');

  if (!login || !password || !host || !port || !database || !authDatabase) {
    throw new Error('MongoDB configuration is incomplete');
  }

  return `mongodb://${login}:${password}@${host}:${port}/${database}?authSource=${authDatabase}`;
}
