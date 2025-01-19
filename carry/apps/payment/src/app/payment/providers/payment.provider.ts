export abstract class PaymentProvider<
  IProduct = unknown,
  IPrice = unknown,
  ICustomer = unknown,
  IInvoiceItem = unknown,
  IInvoice = unknown
> {
  abstract createProduct(productName: string): Promise<IProduct>;

  abstract createPrice(
    productId: string,
    amount: number,
    currency: string
  ): Promise<IPrice>;

  abstract createCustomer(email: string): Promise<ICustomer>;

  abstract addInvoiceItem(
    customerId: string,
    priceId: string,
    quantity: number
  ): Promise<IInvoiceItem>;

  abstract createInvoice(
    customerId: string,
    orderId: string
  ): Promise<IInvoice>;

  abstract sendInvoice(invoiceId: string): Promise<IInvoice>;

  abstract getInvoicePaymentLink(invoiceId: string): Promise<string>;
}
