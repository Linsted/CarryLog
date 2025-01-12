import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

import { OrderRepository } from './providers/order.repository';
import {
  IExtendedCreateOrderDto,
  IExtendedDeleteOrderDto,
} from './interfaces/order.interface';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder(createOrderDto: IExtendedCreateOrderDto) {
    return await this.orderRepository.createOrder(createOrderDto);
  }

  async deleteOrder(deleteOrderDto: IExtendedDeleteOrderDto) {
    return await this.orderRepository.deleteOrder(deleteOrderDto);
  }

  async getUnpublishedOrders() {
    return await this.orderRepository.getUnpublishedOrders();
  }

  async markAsPublished(objectId: Types.ObjectId) {
    return this.orderRepository.markAsPublished(objectId);
  }
}
