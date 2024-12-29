


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