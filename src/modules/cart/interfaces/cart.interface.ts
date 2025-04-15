import {Product} from '#src/common/interfaces/product.interface.ts';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  total: number;
  subtotal: number;
  itemIsPaid: boolean;
}

export interface Cart {
  id: string;
  subtotal: number;
  total: number;
  items: CartItem[]
}

