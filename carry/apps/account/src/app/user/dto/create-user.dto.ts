import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

import { USER_ROLES } from '@carry/constants';
export class CreateUserDto {
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  displayName?: string;

  @IsEmail()
  @Transform(({ value }) => value?.trim())
  email: string;

  @IsEnum(USER_ROLES)
  role: USER_ROLES;
}
