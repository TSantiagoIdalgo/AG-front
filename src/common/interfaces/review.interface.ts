import { Product } from "./product.interface";

export interface User {
    username: string;
    email: string;
    verify: boolean;
}

export enum ReactionType {
  LIKE = "LIKE",
  DISLIKE = "DISLIKE"
}


export interface ReviewReaction {
  id: number;
  user: User;
  // eslint-disable-next-line no-use-before-define
  review: Review;
  reactionType: ReactionType;
  uniqueKey: string;
}

export interface Review {
    id: string;
    title: string;
    comment: string;
    recommended: boolean;
    user: User;
    reactions: ReviewReaction[];
    createdAt: Date;
    product: Product;
}



