export const parsePrice = (productPrice: number, productDiscount?: number) => {
  const format = new Intl.NumberFormat('en-US', {  currency: 'USD', style: 'currency' });
  if (!productDiscount) return format.format(productPrice);
  const total = 100;
  const discountedPrice = productPrice - (productPrice * productDiscount) / total;

  return format.format(discountedPrice);
};