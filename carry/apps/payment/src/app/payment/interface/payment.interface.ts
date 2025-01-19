import { CURRENCY } from '@carry/constants';

export interface IPreparePayment {
  email: string;
  price: number;
  productName: string;
  orderId: string;
  currency: CURRENCY;
  productsQuantity: number;
}
