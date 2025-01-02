import { Request } from 'express';
import { User } from '../../user/models/user.model';

interface IToken {
  token: string;
}

export interface IRequestWithToken extends Request {
  user: User & IToken;
}
