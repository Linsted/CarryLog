import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthController } from './auth.controller';
import { Auth0Strategy } from './strategies/auth0.strategy';
import { SessionSerializer } from './providers/session.serializer';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { RolesGuard } from './guards/roles.guard';
import { AuthenticatedGuard } from './guards/auth.guard';

@Module({
  controllers: [AuthController],
  providers: [
    Auth0Strategy,
    SessionSerializer,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticatedGuard,
    },
  ],
  imports: [UserModule],
})
export class AuthModule {}
