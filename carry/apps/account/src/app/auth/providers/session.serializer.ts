import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { IUser } from '@carry/interfaces';

import { UserService } from '../../user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: IUser, done: (err: Error, user: IUser) => void): void {
    done(null, user);
  }

  async deserializeUser(
    payload: IUser,
    done: (err: Error, payload: IUser) => void
  ): Promise<void> {
    const userDB = await this.userService.getOneUserByEmail(payload.email);
    if (userDB) {
      done(null, userDB);
    } else {
      done(null, null);
    }
  }
}
