import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { ENV_PATHS } from '@carry/constants';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { getMongoConfig } from './configs/mongo.config';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_PATHS.ACCOUNT_SERViCE,
    }),
    MongooseModule.forRootAsync(getMongoConfig()),
    PassportModule.register({ session: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
