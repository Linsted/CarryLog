import { Types } from 'mongoose';

import { CreateOrderDto } from '../dto/create-order.dto';
import { DeleteOrderDto } from '../dto/delete-order.dto';

interface IClientsEmail {
  clientsEmail: string;
}

export interface OutboxMessage {
  routingKey: string;
  exchange: string;
  isPublished: boolean;
  createdAt: Date;
  _id?: Types.ObjectId;
}

export interface IExtendedCreateOrderDto extends IClientsEmail, CreateOrderDto {
  outbox: OutboxMessage[];
}

export interface IExtendedDeleteOrderDto
  extends IClientsEmail,
    DeleteOrderDto {}
