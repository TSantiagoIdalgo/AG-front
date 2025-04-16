import { Product } from './product.interface';
import { User } from './review.interface';

export interface IWishlist {
    id: string;
    user: User;
    whitelistItems: { id: string, product: Product }[]
}