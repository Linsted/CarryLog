import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

import {
  CURRENCY,
  EXCHANGE_NAME,
  PRODUCTS_QUANTITY,
  RMQ_QUEUE,
  ROUTING_KEY,
} from '@carry/constants';
import { IOrderExpanded } from '@carry/interfaces';

import { PaymentService } from '../payment.service';
import { IPreparePayment } from '../interface/payment.interface';

@Injectable()
export class SubscriberService {
  constructor(private readonly paymentService: PaymentService) {}

  @RabbitSubscribe({
    exchange: EXCHANGE_NAME.ORDER,
    routingKey: ROUTING_KEY.ORDER_CREATE,
    queue: RMQ_QUEUE.PAYMENT,
  })
  public async pubSubHandler(msg: IOrderExpanded) {
    console.log(
      `Payment service - ITS ALIVE - received message: ${JSON.stringify(msg)}`
    );

    const paymentData: IPreparePayment = {
      email: msg.clientsEmail,
      price: msg.price,
      currency: CURRENCY.USD,
      orderId: msg._id,
      productName: msg.description,
      productsQuantity: PRODUCTS_QUANTITY,
    };

    const paymentLink = await this.paymentService.preparePayment(paymentData);

    console.log('PAYMENT LINK CREATED', paymentLink);
  }
}
