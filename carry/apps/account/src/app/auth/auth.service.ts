import { Injectable } from '@nestjs/common';

import { USER_ROLES } from '@carry/constants';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { IUserAuth0 } from '../utils/userAuth0.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(userDetails: IUserAuth0) {
    const user = await this.userService.getOneUserByEmail(userDetails.email);
    if (user) return user;

    const createUserDto = <CreateUserDto>{
      ...userDetails,
      role: USER_ROLES.CLIENT,
    };
    const newUser = await this.userService.createUser(createUserDto);
    return newUser;
  }
}
