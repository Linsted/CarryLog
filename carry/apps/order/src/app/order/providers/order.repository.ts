import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { Order } from '../models/order.model';
import {
  IExtendedCreateOrderDto,
  IExtendedDeleteOrderDto,
} from '../interfaces/order.interface';

export class OrderRepository {
  constructor(
    @InjectModel(Order.name)
    private readonly userModel: Model<Order>
  ) {}

  async createOrder(createOrderDto: IExtendedCreateOrderDto): Promise<Order> {
    const newOrder = new this.userModel({ ...createOrderDto, _id: uuidv4() });

    try {
      const savedOrder = await newOrder.save();

      return savedOrder.toObject();
    } catch (error) {
      console.log('Failed to create order', { description: error?.message });
      throw new InternalServerErrorException('Failed to create order', {
        description: error?.message,
      });
    }
  }

  async deleteOrder({ clientsEmail, _id }: IExtendedDeleteOrderDto) {
    try {
      const deletedOrder = await this.userModel
        .findOneAndDelete({
          _id,
          clientsEmail,
        })
        .exec();

      if (!deletedOrder) {
        console.error('Order not found');

        throw new BadRequestException('Order not found');
      }

      return deletedOrder;
    } catch (error) {
      console.error('Error deleting order:', error.message);

      throw new InternalServerErrorException('Failed to delete order');
    }
  }
}
