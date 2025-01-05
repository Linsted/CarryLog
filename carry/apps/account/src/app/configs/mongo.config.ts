import { ConfigService } from '@nestjs/config';

import MongoStore from 'connect-mongo';
import { SessionOptions } from 'express-session';

import { ENVIRONMENT } from '@carry/constants';
import { getMongoString } from '@carry/helpers';

import { STORE_COLLECTION_NAME } from '../utils/constants';

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
