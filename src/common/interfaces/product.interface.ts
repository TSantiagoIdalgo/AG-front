


export interface Genre {
    name: string;
}

export interface Platform {
    name:     string;
    disabled: boolean;
    platform: string;
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

export interface Requirements {
    id:        number;
    os:        string;
    memory:    number;
    graphics:  string;
    directx_v: number;
    storage:   number;
    processor: string;
    type:      string;
}

export interface Product {
    id:              string;
    name:            string;
    description:     string;
    franchise: string;
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
    requirements: Requirements[]
    release_date: string;
    distributor: string
    pegi: string
}

export interface ProductWithUserProps {
    product: Product;
    inWishlist: boolean;
    purchasedByUser:boolean;
    userReviewed: boolean
}