import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

import { JwksService } from '../providers/jwks.service';

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
      cookies?.filter((cookie) => cookie.startsWith(' token=')) || [];

    if (jwtToken) {
      return jwtToken.split('=')[1];
    }

    return null;
  }

  private validateToken(token: string) {
    const decodedToken = jwt.decode(token, { complete: true });

    if (!decodedToken) {
      throw new UnauthorizedException('Invalid token format');
    }

    const kid = decodedToken.header.kid;

    if (!kid) {
      throw new UnauthorizedException('KID is missing');
    }
    const pem = this.jwksService.getPemByKid(kid);

    return jwt.verify(token, pem, { algorithms: ['RS256'] });
  }
}
