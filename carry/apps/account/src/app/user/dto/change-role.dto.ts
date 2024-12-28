import { IsEmail, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';

import { USER_ROLES } from '@carry/constants';

export class ChangeRoleDto {
  @IsEmail()
  @Transform(({ value }) => value?.trim())
  email: string;

  @IsEnum(USER_ROLES)
  role: USER_ROLES;
}
