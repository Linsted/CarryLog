import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Cron, CronExpression } from '@nestjs/schedule';

import { OrderService } from '../order.service';

@Injectable()
export class PublishService {
  constructor(
    private readonly orderService: OrderService,
    private readonly amqpConnection: AmqpConnection
  ) {
    console.log('AmqpConnection initialized:', !!this.amqpConnection);
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async publishMessages() {
    const unpublishedOrders = await this.orderService.getUnpublishedOrders();

    if (unpublishedOrders.length < 1) return;

    try {
      for (const order of unpublishedOrders) {
        for (const outboxMessage of order.outbox) {
          await this.amqpConnection.publish(
            outboxMessage.exchange,
            outboxMessage.routingKey,
            order,
            { persistent: true }
          );

          await this.orderService.markAsPublished(outboxMessage._id);
        }
      }
    } catch (error) {
      console.error(
        'Can`t process unpublished order',
        error.message,
        error.stack
      );
    }
  }
}
