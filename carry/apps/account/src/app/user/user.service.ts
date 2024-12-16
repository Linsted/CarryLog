import { Injectable } from '@nestjs/common';

import { UserRepository } from './providers/user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public createUser(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto);
  }

  public getUsers() {
    return this.userRepository.getUsers();
  }
}
