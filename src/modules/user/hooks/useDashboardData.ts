/* eslint-disable max-statements */
import { CartItemWithoutProduct, Checkout, ProductCheckout } from '#src/common/interfaces/checkout.interface.ts';
import { DataResponse } from '#src/common/interfaces/pageable-data.interface.ts';
import { Product } from '#src/common/interfaces/product.interface.ts';
import { CHECKOUT_ENDPOINT, PRODUCT_ENDPOINT } from '#src/config/endpoints.ts';
import { useFetchData } from '#src/hooks/use-fetch-data.tsx';
import { IState } from '#src/state/store.ts';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const useDashboardData = () => {
  const [productCheckouts, setProductCheckouts] = useState<ProductCheckout[]>([]);
  const [checkouts, setCheckouts] = useState<Checkout[]>([]);
  const [pageableProducts, setPageableProducts] = useState<DataResponse<Product>>();
  const { newPaymentReceived } = useSelector((state: IState) => state.websocket);
  const { data: checkoutsData, loading: checkoutLoading } = useFetchData<Checkout[]>(CHECKOUT_ENDPOINT.GET.getAllCheckouts(), {
    query: { pageNumber: 0, pageSize: 100 }
  });
  const { data: productCheckout, loading: productCheckoutLoading } = useFetchData<ProductCheckout[]>(CHECKOUT_ENDPOINT.GET.getProductCheckouts(), {
    query: { pageNumber: 0, pageSize: 100 }
  });
  const { data: products, loading: productsLoading } = useFetchData<DataResponse<Product>>(PRODUCT_ENDPOINT.GET.findAll(), {
    query: { pageNumber: 0, pageSize: 10 }
  });

  const updateCheckoutInfo = (paymentId: string, cartItems: CartItemWithoutProduct[]) => {
    const notFound = -1;
    const checkoutClone = structuredClone(productCheckouts);
    const checkoutIndex = checkoutClone.findIndex(checkout => checkout.id === paymentId);
    if (checkoutIndex !== notFound) {
      const mergedItems = checkoutClone[checkoutIndex].cartItems.concat(cartItems);
      
      const sortedItems = mergedItems.sort((itemA, itemB) => {
        const dateItemA = new Date(itemA.paidAt);
        const dateItemB = new Date(itemB.paidAt);
        return dateItemA.getTime() - dateItemB.getTime();
      });
      checkoutClone[checkoutIndex].cartItems = sortedItems;
      setProductCheckouts(checkoutClone);
    }
  };
  useEffect(() => {

    if (newPaymentReceived) {

      if (productCheckouts.some(checkout => checkout.id === newPaymentReceived.id)) {
        updateCheckoutInfo(newPaymentReceived.id, newPaymentReceived.cartItems);
      } else {
        setProductCheckouts(prev => [...prev, newPaymentReceived]);
      }
    }
  }, [newPaymentReceived]);

  useEffect(() => {
    if (productCheckout?.body.data && !productCheckouts.length) setProductCheckouts(productCheckout.body.data);
    if (checkoutsData?.body.data && !checkouts.length) setCheckouts(checkoutsData.body.data);
    if (products?.body.data && !pageableProducts?.content.length) setPageableProducts(products.body.data);
  }, [productCheckout?.body, checkoutsData?.body]);

  return { checkouts, loading: productCheckoutLoading || checkoutLoading || productsLoading, pageableProducts, productCheckouts };
};