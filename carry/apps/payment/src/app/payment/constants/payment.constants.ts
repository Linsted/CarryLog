export enum STRIPE_EVENTS {
  PAYMENT_SUCCESS = 'payment_intent.succeeded',
}

export const STRIPE_WEBHOOK_PATH = 'api/stripe/webhook';

export const REQUEST_BODY_TYPE = 'rawBody';
