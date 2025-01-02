import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { ENV_PATHS } from '@carry/constants';

import { JwksService } from './providers/jwks.service';
import { AuthGuard } from './guards/auth.guard';

@Module({
  controllers: [],
  providers: [JwksService, AuthGuard],
  exports: [JwksService, AuthGuard],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_PATHS.ACCOUNT_SERVICE,
    }),
    ScheduleModule.forRoot(),
  ],
})
export class CommonAuthModule {}
