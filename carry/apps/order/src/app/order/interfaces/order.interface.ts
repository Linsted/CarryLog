import { CreateOrderDto } from '../dto/create-order.dto';
import { DeleteOrderDto } from '../dto/delete-order.dto';

interface IClientsEmail {
  clientsEmail: string;
}

export interface IExtendedCreateOrderDto
  extends IClientsEmail,
    CreateOrderDto {}

export interface IExtendedDeleteOrderDto
  extends IClientsEmail,
    DeleteOrderDto {}
