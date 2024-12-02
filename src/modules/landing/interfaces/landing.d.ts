

export interface Genre {
    name: string;
}

export interface Platform {
    name:     string;
    disabled: boolean;
}

export interface Product {
    id:              string;
    name:            string;
    description:     string;
    platforms:       Platform[];
    developer:       string;
    genres:          Genre[];
    tags:            string[];
    disabled:        boolean;
    stock:           number;
    price:           number;
    discount:        number;
    images:          string[];
    backgroundImage: string;
    trailer:         string;
    mainImage:       string;
}

export interface Sort {
    sorted:   boolean;
    unsorted: boolean;
    empty:    boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface IGetAllProducts {
    content:          Product[];
    pageable:         Pageable;
    totalPages:       number;
    totalElements:    number;
    last:             boolean;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    numberOfElements: number;
    empty:            boolean;
}

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
  "orderByRecommendation": boolean
  "orderByCheckoutCount": boolean
}