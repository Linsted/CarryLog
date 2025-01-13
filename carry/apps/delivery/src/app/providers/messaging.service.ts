import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

import { EXCHANGE_NAME, RMQ_QUEUE, ROUTING_KEY } from '@carry/constants';
import { IOrderExpanded } from '@carry/interfaces';

@Injectable()
export class MessagingService {
  @RabbitSubscribe({
    exchange: EXCHANGE_NAME.ORDER,
    routingKey: ROUTING_KEY.ORDER_CREATE,
    queue: RMQ_QUEUE.ORDER,
  })
  public async pubSubHandler(msg: IOrderExpanded) {
    console.log(
      `Delivery service - ITS ALIVE - received message: ${JSON.stringify(msg)}`
    );
  }
}
