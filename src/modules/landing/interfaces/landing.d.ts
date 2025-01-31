

export interface GetAllProductsProps {
  "pageSize": number;
  "pageNumber": number;
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
  "orderbyWishList": boolean;
  "orderByRecommendation": boolean
  "orderByCheckoutCount": boolean
  "orderByCreatedAt": boolean ;
  "orderByPrice": boolean;
}