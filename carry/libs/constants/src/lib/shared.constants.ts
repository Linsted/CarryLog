export enum ENV_PATHS {
  ACCOUNT_SERVICE = 'envs/.account.env',
  ORDER_SERVICE = 'envs/.order.env',
  REDIS = 'envs/.redis.env',
}

export enum USER_ROLES {
  CLIENT = 'Client',
  ADMIN = 'Admin',
  EMPLOYEE = 'Employee',
}

export enum ENVIRONMENT {
  PROD = 'production',
  DEV = 'development',
}

export enum CACHE_KEYS {
  TOKEN = 'token',
}

export const GLOBAL_PREFIX = 'api';

export enum TIME {
  ONE_DAY_IN_MS = 1000 * 60 * 60 * 24,
}
