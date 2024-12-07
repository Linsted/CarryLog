import { USER_ROLES } from '@carry/constants';

export interface IUser {
  _id: string;
  displayName: string;
  email: string;
  passwordHash: string;
  role: USER_ROLES;
}
