import { CartItem } from '#modules/cart/interfaces/cart.interface.ts';
import { User } from './review.interface';

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
        cartItem: CartItem
    }[];
    'createdAt': Date
}