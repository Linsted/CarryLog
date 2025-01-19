export enum ENV_PATHS {
  ACCOUNT_SERVICE = 'envs/.account.env',
  ORDER_SERVICE = 'envs/.order.env',
  REDIS = 'envs/.redis.env',
  RABBIT_MQ = 'envs/.rmq.env',
  DELIVERY_SERVICE = 'envs/.delivery.env',
  PAYMENT_SERVICE = 'envs/.payment.env',
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
  PAYMENT = 'payment-exchange',
}

export enum EXCHANGE_TYPE {
  TOPIC = 'topic',
}

export enum ROUTING_KEY {
  ORDER_CREATE = 'order.create',
  PAYMENT_SUCCESS = 'payment.success',
}

export enum RMQ_QUEUE {
  ORDER = 'order-queue',
  PAYMENT = 'payment-queue',
  DELIVERY = 'delivery-queue',
  PAYMENT_ORDER_SUCCESS = 'payment-order-success',
}

export enum CURRENCY {
  USD = 'usd',
}

export const PRODUCTS_QUANTITY = 1;
