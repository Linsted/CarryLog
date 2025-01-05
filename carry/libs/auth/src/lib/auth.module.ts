import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';

import { ENV_PATHS } from '@carry/constants';

import { JwksService } from './providers/jwks.service';
import { AuthGuard } from './guards/auth.guard';
import { getRedisConfig } from './config/redis.config';

@Module({
  controllers: [],
  providers: [JwksService, AuthGuard],
  exports: [JwksService, AuthGuard],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [ENV_PATHS.REDIS],
    }),
    ScheduleModule.forRoot(),
    CacheModule.register(getRedisConfig()),
  ],
})
export class CommonAuthModule {}
