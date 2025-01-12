export enum ENV_PATHS {
  ACCOUNT_SERVICE = 'envs/.account.env',
  ORDER_SERVICE = 'envs/.order.env',
  REDIS = 'envs/.redis.env',
  RABBIT_MQ = 'envs/.rmq.env',
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

export enum ORDER_STATUSES {
  CANCELED = 'canceled',
  IN_PROGRESS = 'in_progress',
  FINISHED = 'finished',
}

export enum EXCHANGE_NAME {
  ORDER = 'order-exchange',
}

export enum EXCHANGE_TYPE {
  TOPIC = 'topic',
}

export enum ROUTING_KEY {
  ORDER_CREATE = 'order.create',
}
