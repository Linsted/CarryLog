import { Types } from 'mongoose';

import { ORDER_STATUSES } from '@carry/constants';

export interface IOrder {
  _id: string;
  clientsEmail: string;
  status?: ORDER_STATUSES;
  loadingDate: Date;
  unloadingDate: Date;
  price: number;
  description: string;
  isOrderPaid?: boolean;
}

export interface IOutboxMessage {
  routingKey: string;
  exchange: string;
  isPublished: boolean;
  createdAt: Date;
  _id?: Types.ObjectId;
}

export interface IOrderExpanded extends IOrder {
  outbox: IOutboxMessage[];
  __v: number;
}
