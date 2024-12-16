import { USER_ROLES } from '@carry/constants';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  displayName?: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  passwordHash: string;

  @IsEnum(USER_ROLES)
  role: USER_ROLES;
}
