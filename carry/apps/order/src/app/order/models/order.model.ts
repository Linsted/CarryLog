import { Document, Types } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { ORDER_STATUSES } from '@carry/constants';
import { IOrder } from '@carry/interfaces';

import { OutboxMessage } from '../interfaces/order.interface';

@Schema()
export class Order extends Document implements IOrder {
  @Prop()
  _id: string;

  @Prop({ required: true })
  clientsEmail: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: Date, required: true })
  loadingDate: Date;

  @Prop({ type: Date, required: true })
  unloadingDate: Date;

  @Prop({
    required: false,
    enum: ORDER_STATUSES,
    type: String,
    default: ORDER_STATUSES.IN_PROGRESS,
  })
  status?: ORDER_STATUSES;

  @Prop({
    required: false,
    type: Boolean,
    default: false,
  })
  isOrderPaid?: boolean;

  @Prop({
    type: [
      {
        routingKey: { type: String, required: true },
        exchange: { type: String, required: true },
        isPublished: { type: Boolean, required: true },
        createdAt: { type: Date, required: true },
        _id: { type: Types.ObjectId, required: false, auto: true },
      },
    ],
  })
  outbox: OutboxMessage[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
