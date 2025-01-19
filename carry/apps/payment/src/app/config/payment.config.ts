import {
  STRIPE_WEBHOOK_PATH,
  REQUEST_BODY_TYPE,
} from '../payment/constants/payment.constants';

export function getStrapiConfig() {
  return {
    apiKey: process.env.STRAPI_SECRET_KEY,

    webhookConfig: {
      endpointPath: STRIPE_WEBHOOK_PATH,
      stripeSecrets: {
        accountTest: process.env.WEB_HOOK_SECRET,
      },
      requestBodyProperty: REQUEST_BODY_TYPE,
    },
  };
}
