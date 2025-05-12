import {Product} from '#src/common/interfaces/product.interface.ts';

export type PaymentStatus = 'paid' | 'unpaid' | 'canceled'

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  total: number;
  subtotal: number;
  itemIsPaid: boolean;
  paidAt: Date;
  paymentStatus: PaymentStatus
}

export interface Cart {
  id: string;
  subtotal: number;
  total: number;
  items: CartItem[]
}

