/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
export enum PRODUCT_ENDPOINT {
    POST_PRODUCT = "product/create",
    PATCH_PRODUCT = "product/update/",
    GET_FIND_ONE = "product/",
    DELETE_PRODUCT = "product/",
    GET_FIND_ALL = "product/"
}

export enum USER_ENDPOINT {
    GET_FIND_ONE = "user/",
    PUT_UPDATE = "user/",
    DELETE_USER = "user/",
    GET_VERIFY = "user/verify",
    GET_FIND_ALL = "user/"
}

export enum WISHLIST_ENDPOINT {
    POST_WISHLIST = "whitelist/",
    DELETE_WISHLIST = "whitelist/",
    GET_FIND_BY_USER = "whitelist/user",
    GET_PRODUCT_WISHLIST = "whitelist/product/",
    GET_FIND_ALL = "whitelist/"
}