

export interface GetAllProductsProps {
  "pageSize": number;
  "pageNumber": number;
  "orderbyWishList": boolean;
  "developer": string;
  "franchise": string;
  "minPrice": number;
  "maxPrice": number;
  "minDiscount": number;
  "maxDiscount": number;
  "genres": string[]
  "tags": string[]
  "platform": string[]
  "name": string;
  "orderByRecommendation": boolean
  "orderByCheckoutCount": boolean
}