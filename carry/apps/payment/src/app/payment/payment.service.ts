import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { StripeWebhookHandler } from '@golevelup/nestjs-stripe';
import Stripe from 'stripe';

import { EXCHANGE_NAME, ROUTING_KEY } from '@carry/constants';

import { IPreparePayment } from './interface/payment.interface';
import { PaymentProvider } from './providers/payment.provider';
import { STRIPE_EVENTS } from './constants/payment.constants';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentProvider: PaymentProvider,
    private readonly amqpConnection: AmqpConnection
  ) {}

  @StripeWebhookHandler(STRIPE_EVENTS.PAYMENT_SUCCESS)
  async handlePaymentIntentCreated(event: Stripe.PaymentIntentCreatedEvent) {
    console.log('WEBHOOK - payment success');

    try {
      await this.amqpConnection.publish(
        EXCHANGE_NAME.PAYMENT,
        ROUTING_KEY.PAYMENT_SUCCESS,
        event,
        { persistent: true }
      );
    } catch (error) {
      console.log('Can`t publish message to RMQ', error);
      throw new InternalServerErrorException({
        error,
        description: 'Can`t publish message to RMQ',
      });
    }
  }

  async preparePayment(paymentData: IPreparePayment): Promise<string> {
    const customer = (await this.paymentProvider.createCustomer(
      paymentData.email
    )) as Stripe.Customer;

    const product = (await this.paymentProvider.createProduct(
      paymentData.productName
    )) as Stripe.Product;

    const price = (await this.paymentProvider.createPrice(
      product.id,
      paymentData.price,
      paymentData.currency
    )) as Stripe.Price;

    await this.paymentProvider.addInvoiceItem(
      customer.id,
      price.id,
      paymentData.productsQuantity
    );

    const invoice = (await this.paymentProvider.createInvoice(
      customer.id,
      paymentData.orderId
    )) as Stripe.Invoice;

    await this.paymentProvider.sendInvoice(invoice.id);

    console.log(`Invoice sent to ${paymentData.email}`);

    const invoiceUrl = await this.paymentProvider.getInvoicePaymentLink(
      invoice.id
    );

    return invoiceUrl;
  }
}
