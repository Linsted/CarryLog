import { USER_ROLES } from '@carry/constants';
import { IUser } from '@carry/interfaces';

export class UserEntity implements IUser {
  _id: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: USER_ROLES;
}
