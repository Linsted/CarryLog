import { Injectable } from '@nestjs/common';

import { UserRepository } from './providers/user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async createUser(createUserDto: CreateUserDto) {
    return await this.userRepository.createUser(createUserDto);
  }

  public async getUsers() {
    return await this.userRepository.getUsers();
  }

  public async getOneUserByEmail(email: string) {
    return await this.userRepository.getUserByEmail(email);
  }
}
