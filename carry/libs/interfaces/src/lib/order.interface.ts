import { ORDER_STATUSES } from '@carry/constants';

export interface IOrder {
  _id: string;
  clientsEmail: string;
  status?: ORDER_STATUSES;
  loadingDate: Date;
  unloadingDate: Date;
  price: number;
  description: string;
}
