import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export function getMongoConfig(): MongooseModuleAsyncOptions {
  return {
    useFactory: (configService: ConfigService) => ({
      uri: getMongoString(configService),
    }),
    inject: [ConfigService],
    imports: [ConfigModule],
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

export function getValidationConfig() {
  return {
    whitelist: true,
  };
}
