import { Request } from 'express';

interface JWK {
  kid: string;
  kty: 'RSA';
  use?: string;
  alg?: string;
  n: string;
  e: string;
  [key: string]: unknown;
}
export interface IJWKS {
  keys: JWK[];
}

export interface IRequestWithUserUnknown extends Request {
  user: unknown;
}
