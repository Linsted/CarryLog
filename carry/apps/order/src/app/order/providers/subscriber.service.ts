import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

import { Public } from '@carry/decorators';
import { EXCHANGE_NAME, RMQ_QUEUE, ROUTING_KEY } from '@carry/constants';

@Injectable()
export class SubscriberService {
  @Public()
  @RabbitSubscribe({
    exchange: EXCHANGE_NAME.PAYMENT,
    routingKey: ROUTING_KEY.PAYMENT_SUCCESS,
    queue: RMQ_QUEUE.PAYMENT_ORDER_SUCCESS,
  })
  public async pubSubHandler(msg: unknown) {
    console.log(
      `ORDER SERVICE - received message from PAYMENT SERVICE: ${JSON.stringify(
        msg
      )}`
    );
  }
}
