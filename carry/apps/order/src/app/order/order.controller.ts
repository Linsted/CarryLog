import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';

import { IRequestWithUserUnknown } from '@carry/interfaces';
import { UserEmail } from '@carry/decorators';
import { EXCHANGE_NAME, ROUTING_KEY } from '@carry/constants';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { DeleteOrderDto } from './dto/delete-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getOrders(@Req() req: IRequestWithUserUnknown) {
    return this.orderService.getUnpublishedOrders();
  }

  @Post()
  async createOrder(
    @UserEmail() email: string,
    @Body() createOrderDto: CreateOrderDto
  ) {
    return this.orderService.createOrder({
      ...createOrderDto,
      clientsEmail: email,
      outbox: [
        {
          routingKey: ROUTING_KEY.ORDER_CREATE,
          exchange: EXCHANGE_NAME.ORDER,
          isPublished: false,
          createdAt: new Date(),
        },
      ],
    });
  }

  @Delete()
  async deleteOrder(
    @UserEmail() email: string,
    @Body() deleteOrderDto: DeleteOrderDto
  ) {
    const deletedOrder = await this.orderService.deleteOrder({
      ...deleteOrderDto,
      clientsEmail: email,
    });

    return {
      message: 'Order deleted successfully',
      deletedOrder,
    };
  }
}
