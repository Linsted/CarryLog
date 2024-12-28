import { Body, Controller, Get, Post } from '@nestjs/common';

import { USER_ROLES } from '@carry/constants';

import { UserService } from './user.service';
import { ChangeRoleDto } from './dto/change-role.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Roles(USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE)
  getUsers() {
    return this.userService.getUsers();
  }

  @Post('change-role')
  @Roles(USER_ROLES.ADMIN)
  changeUserRole(@Body() changeRoleDto: ChangeRoleDto) {
    return this.userService.changeUserRole(changeRoleDto);
  }

  // TODO - Delete temporary testing route
  // @Post()
  // createUser(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.createUser(createUserDto);
  // }
}
