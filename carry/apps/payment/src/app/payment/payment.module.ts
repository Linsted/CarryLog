import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StripeModule } from '@golevelup/nestjs-stripe';

import { ENV_PATHS } from '@carry/constants';

import { getStrapiConfig } from '../config/payment.config';
import { PaymentService } from './payment.service';
import { PaymentProvider } from './providers/payment.provider';
import { StripeProvider } from './providers/strapi.provider';
import { SubscriberService } from './providers/subscriber.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_PATHS.PAYMENT_SERVICE,
    }),
    StripeModule.forRoot(StripeModule, getStrapiConfig()),
  ],
  controllers: [],
  providers: [
    PaymentService,
    {
      provide: PaymentProvider,
      useClass: StripeProvider,
    },
    SubscriberService,
  ],
})
export class PaymentModule {}
