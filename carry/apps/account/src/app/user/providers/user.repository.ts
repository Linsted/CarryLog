import { InjectModel } from '@nestjs/mongoose';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

    try {
      const savedUser = await newUser.save();
      const user = savedUser.toObject();

      return user;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user', {
        description: error?.message,
      });
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to get users', {
        description: error?.message,
      });
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await this.userModel.findOne({ email }).exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to find user', {
        description: error?.message,
      });
    }
  }
}
