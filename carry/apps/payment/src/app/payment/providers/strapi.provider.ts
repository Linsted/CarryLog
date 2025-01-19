import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import Stripe from 'stripe';

import { PaymentProvider } from './payment.provider';

@Injectable()
export class StripeProvider implements PaymentProvider {
  constructor(@InjectStripeClient() private readonly stripeClient: Stripe) {}

  async createProduct(
    productName: string
  ): Promise<Stripe.Response<Stripe.Product>> {
    try {
      const product = await this.stripeClient.products.create({
        name: productName,
      });

      if (!product) {
        throw new BadRequestException('No product created');
      }

      return product;
    } catch (error) {
      console.error('No product created', error);
      throw new InternalServerErrorException({
        error,
        description: 'No product created',
      });
    }
  }

  async createPrice(
    productId: string,
    amount: number,
    currency: string
  ): Promise<Stripe.Response<Stripe.Price>> {
    try {
      const price = await this.stripeClient.prices.create({
        product: productId,
        unit_amount: amount,
        currency: currency,
      });

      if (!price) {
        throw new BadRequestException('No price created');
      }

      return price;
    } catch (error) {
      console.error('No price created', error);
      throw new InternalServerErrorException({
        error,
        description: 'No price created',
      });
    }
  }

  async createCustomer(email: string): Promise<Stripe.Customer> {
    try {
      const customer = await this.stripeClient.customers.create({
        email,
      });

      if (!customer) {
        throw new BadRequestException('No customer created');
      }

      return customer;
    } catch (error) {
      console.error('No customer created', error);
      throw new InternalServerErrorException({
        error,
        description: 'No customer created',
      });
    }
  }

  async addInvoiceItem(
    customerId: string,
    priceId: string,
    quantity: number
  ): Promise<Stripe.InvoiceItem> {
    try {
      const invoiceItem = await this.stripeClient.invoiceItems.create({
        customer: customerId,
        price: priceId,
        quantity,
      });

      if (!invoiceItem) {
        throw new BadRequestException('No Invoice Item added');
      }

      return invoiceItem;
    } catch (error) {
      console.error('No Invoice Item added', error);
      throw new InternalServerErrorException({
        error,
        description: 'No Invoice Item added',
      });
    }
  }

  async createInvoice(
    customerId: string,
    orderId: string
  ): Promise<Stripe.Invoice> {
    try {
      const invoice = await this.stripeClient.invoices.create({
        customer: customerId,
        collection_method: process.env
          .COLLECTION_METHOD as Stripe.InvoiceCreateParams.CollectionMethod,
        days_until_due: parseInt(process.env.DAYS_UNTIL_DUE, 10),
        auto_advance: process.env.AUTO_ADVANCE === 'true',
        pending_invoice_items_behavior: process.env
          .PENDING_INVOICE_ITEMS_BEHAVIOR as Stripe.InvoiceCreateParams.PendingInvoiceItemsBehavior,
        metadata: {
          orderId,
        },
      });

      if (!invoice) {
        throw new BadRequestException('No Invoice created');
      }

      return invoice;
    } catch (error) {
      console.error('No Invoice created', error);
      throw new InternalServerErrorException({
        error,
        description: 'No Invoice created',
      });
    }
  }

  async sendInvoice(invoiceId: string): Promise<Stripe.Invoice> {
    try {
      const invoice = await this.stripeClient.invoices.sendInvoice(invoiceId);

      if (!invoice) {
        throw new BadRequestException('No Invoice to send');
      }

      return invoice;
    } catch (error) {
      console.error('No Invoice to send', error);
      throw new InternalServerErrorException({
        error,
        description: 'No Invoice to send',
      });
    }
  }

  async getInvoicePaymentLink(invoiceId: string): Promise<string> {
    try {
      const invoice = await this.stripeClient.invoices.retrieve(invoiceId);

      if (!invoice || !invoice.hosted_invoice_url) {
        throw new BadRequestException('No stripe link');
      }

      return invoice.hosted_invoice_url;
    } catch (error) {
      console.error('No stripe link', error);
      throw new InternalServerErrorException({
        error,
        description: 'No stripe link',
      });
    }
  }
}
