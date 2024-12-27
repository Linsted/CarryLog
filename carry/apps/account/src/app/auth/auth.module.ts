import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { Auth0Strategy } from './strategies/auth0.strategy';
import { SessionSerializer } from './providers/session.serializer';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [Auth0Strategy, SessionSerializer, AuthService],
  imports: [UserModule],
})
export class AuthModule {}
