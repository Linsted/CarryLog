import { IOutboxMessage } from '@carry/interfaces';

import { CreateOrderDto } from '../dto/create-order.dto';
import { DeleteOrderDto } from '../dto/delete-order.dto';

interface IClientsEmail {
  clientsEmail: string;
}

export interface IExtendedCreateOrderDto extends IClientsEmail, CreateOrderDto {
  outbox: IOutboxMessage[];
}

export interface IExtendedDeleteOrderDto
  extends IClientsEmail,
    DeleteOrderDto {}
