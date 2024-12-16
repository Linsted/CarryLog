import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../models/user.model';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel({ ...createUserDto, _id: uuidv4() });
    const savedUser = await newUser.save();

    const { passwordHash, ...userWithoutPassword } = savedUser.toObject();

    return userWithoutPassword;
  }

  async getUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
}
