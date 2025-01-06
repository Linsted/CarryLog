import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

import { JwksService } from '../providers/jwks.service';
import { COOKIE_TOKEN_PREFIXES } from '../constants/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwksService: JwksService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Missing token');
    }

    try {
      const payload = this.validateToken(token);
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractToken(request: Request): string | null {
    const cookies = request.headers.cookie?.split(';');

    const [jwtToken] =
      cookies?.filter((cookie) =>
        COOKIE_TOKEN_PREFIXES.some((prefix) => cookie.startsWith(prefix))
      ) || [];

    if (jwtToken) {
      return jwtToken.split('=')[1];
    }

    return null;
  }

  private async validateToken(token: string) {
    const decodedToken = jwt.decode(token, { complete: true });

    if (!decodedToken) {
      throw new UnauthorizedException('Invalid token format');
    }

    const kid = decodedToken.header.kid;

    if (!kid) {
      throw new UnauthorizedException('KID is missing');
    }
    const pem = await this.jwksService.getPemByKid(kid);

    try {
      return jwt.verify(token, pem, { algorithms: ['RS256'] });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        console.error('Token has expired', error);
        throw new UnauthorizedException('Token has expired');
      } else {
        console.error('Token validation failed', error);
        throw new UnauthorizedException('Token validation failed');
      }
    }
  }
}
