import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import { Strategy } from 'passport-auth0';

import { IUserAuth0 } from '../../utils/userAuth0.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
  constructor(private readonly authService: AuthService) {
    super({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_SECRET,
      callbackURL: process.env.AUTH0_CALLBACK_URL,
      scope: 'openid profile email',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const decodedToken = jwt.decode(profile.id_token) as Record<
      string,
      string | number
    >;

    const { name: displayName, email } = decodedToken;

    const userDetails = <IUserAuth0>{ displayName, email };

    const user = await this.authService.validateUser(userDetails);

    return { ...user, token: profile.id_token };
  }
}
