export const PRODUCT_ENDPOINT = {
  DELETE: {
    remove: (productId: string) => `product/${productId}`
  },
  GET: {
    findAll: () => 'product/',
    findById: (productId: string) => `product/${productId}`,
  },
  PATCH: {
    update: (productId: string) => `product/update/${productId}`
  },
  POST: {
    create: () => 'product/create',
  },
};

export const CART_ENDPOINT = {
  DELETE: {
    remove: () => 'cart/remove/{productId}',
  },
  GET: {
    getUserCart: () => 'cart/',
    getUserCartProductsCount: () => 'cart/count/unpaid',
    getUserPaidCart: () => 'cart/paid',
  },
  POST: {
    decreaseProduct: () => 'cart/decrease/{productId}',
    increaseProduct: () => 'cart/increase/{productId}',
  }
};

export const USER_ENDPOINT = {
  DELETE: {
    remove: (userId: string) => `user/${userId}`
  },
  GET: {
    findById: (userId?: string) => `user/find/${userId}`,
    // Utiliza una query ?token=${value} para verificar a un usuario
    verifyUser: () => 'user/verify'
  },
  PATCH: {
    update: (userId: string) => `user/${userId}`
  },
  POST: {
    login: () => 'auth/login',
    register: () => 'auth/register',
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
    count: () => 'review/count',
    findAll: () => 'review/',
    findByProduct: (productId: string) => `review/product/${productId}`,
  },
  PATCH: {
    update: (reviewId: string) => `review/${reviewId}`,
  },
  POST: {
    create: (productId: string) => `review/${productId}`,
    // Coloca un like o dislike a una review
    setReaction: () => 'review/reaction/'
  },
};

export const PLATFORM_ENDPOINT = {
  GET: {
    findAll: () => 'platform/'
  }
};

export const GENRE_ENDPOINT = {
  DELETE: {
    deleteById: (name: string) => `genre/${name}`
  },
  GET: {
    findAll: () => 'genre/',
    findById: (name: string) => `genre/${name}`
  },
  POST: {
    create: () => 'genre/'
  },
};

export const CHECKOUT_ENDPOINT = {
  GET: {
    getUserCheckouts: () => 'api/checkout/user'
  },
  POST: {
    createCheckoutSession: () => 'api/checkout/create-checkout-session',
  }
};