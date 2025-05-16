

export interface GetAllProductsProps {
  'pageSize': number;
  'pageNumber': number;
  'developer': string;
  'franchise': string;
  'minPrice': number;
  'maxPrice': number;
  'minDiscount': number;
  'maxDiscount': number;
  'genres': string[]
  'platform': string[]
  'name': string;
  'orderByWishList': boolean;
  'orderByRecommendation': boolean
  'orderByCheckoutCount': boolean;
  'orderByDiscount': boolean;
  'orderByCreatedAt': boolean ;
  'orderByPrice': boolean;
}