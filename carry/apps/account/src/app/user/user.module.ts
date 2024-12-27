import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './models/user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './providers/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [UserService],
})
export class UserModule {}
