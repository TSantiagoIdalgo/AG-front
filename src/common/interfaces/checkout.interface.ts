import { Platform } from './product.interface';
import { User } from './review.interface';

export interface CheckoutProduct {
  id: string;
  name: string;
  price: number;
  discount: number;
  trailer: string;
  mainImage: string;
  platforms: Platform[]
}

export interface CheckoutItem {
  id: string;
  product: CheckoutProduct;
  quantity: number;
  total: number;
  subtotal: number;
  itemIsPaid: boolean;
}

export interface Checkout {
    'id': string,
    'stripePaymentId': string
    'subTotal': number,
    'total': number,
    'currency': string,
    'paymentStatus': 'paid' | 'unpaid' | 'canceled',
    'user': User;
    'checkoutItems': {
        id: number;
        cartItem: CheckoutItem
    }[];
    'createdAt': Date
}


export interface ProductCheckout {
    id:        string;
    name:      string;
    price:     number;
    discount:  number;
    trailer:   string;
    mainImage: string;
    stock: number;
    disabled: boolean
}


export interface ProductWithCheckouts {
    product:   ProductCheckout;
    checkouts: Checkout[];
}

export interface ProductCheckoutItem {
    id:              string;
    stripePaymentId: string;
    subTotal:        number;
    total:           number;
    currency:        string;
    paymentStatus:   string;
    user:            User;
    createdAt:       Date;
}