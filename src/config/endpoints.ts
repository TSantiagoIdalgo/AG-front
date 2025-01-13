export const PRODUCT_ENDPOINT = {
  DELETE: {
    remove: (productId: string) => `product/${productId}`
  },
  GET: {
    findAll: () => "product/" ,
    findById: (productId: string) => `product/${productId}`,
  },
  PATCH: {
    update: (productId: string) => `product/update/${productId}`
  },
  POST: {
    create: () => "product/create",
  },
};

export const USER_ENDPOINT = {
  DELETE: {
    remove: (userId: string) => `user/${userId}`
  },
  GET: {
    findById: (userId?: string) => `user/find/${userId}`,
    // Utiliza una query ?token=${value} para verificar a un usuario
    verifyUser: () => `user/verify`
  },
  PATCH: {
    update: (userId: string) => `user/${userId}`
  }
};

export const REVIEW_ENDPOINT = {
  DELETE: {
    remove: (reviewId: string) => `review/${reviewId}`
  },
  GET: {
    // Obtiene el promedio de reviews positivas que tiene el product
    avgByProduct: (productId: string) => `review/recommendation/${productId}`,
    // Obtiene la cantidad de reviews que existen
    count: () => "review/count",
    findAll: () => "review/",
    findByProduct: (productId: string) => `review/product/${productId}`,
  },
  PATCH: {
    update: (reviewId: string) => `review/${reviewId}`,
  },
  POST: {
    create: (productId: string) => `review/${productId}`,
    // Coloca un like o dislike a una review
    setReaction: () => "review/reaction/"
  },
};