import { CartItemWithoutProduct, ProductCheckout } from '#src/common/interfaces/checkout.interface.ts';
import { CHECKOUT_ENDPOINT } from '#src/config/endpoints.ts';
import { useFetchData } from '#src/hooks/use-fetch-data.tsx';
import { IState } from '#src/state/store.ts';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const useDashboardData = () => {
  const [checkouts, setCheckouts] = useState<ProductCheckout[]>([]);
  const { newPaymentReceived } = useSelector((state: IState) => state.websocket);
  const { data, loading } = useFetchData<ProductCheckout[]>(CHECKOUT_ENDPOINT.GET.getProductCheckouts(), {
    query: { pageNumber: 0, pageSize: 100 }
  });

  const updateCheckoutInfo = (paymentId: string, cartItems: CartItemWithoutProduct[]) => {
    const notFound = -1;
    const checkoutClone = structuredClone(checkouts);
    const checkoutIndex = checkoutClone.findIndex(checkout => checkout.id === paymentId);
    if (checkoutIndex !== notFound) {
      const mergedItems = checkoutClone[checkoutIndex].cartItems.concat(cartItems);
      const sortedItems = mergedItems.sort((itemA, itemB) => {
        const dateItemA = new Date(itemA.paidAt);
        const dateItemB = new Date(itemB.paidAt);
        return dateItemA.getTime() - dateItemB.getTime();
      });

      checkoutClone[checkoutIndex].cartItems = sortedItems;
      setCheckouts(checkoutClone);
    }
  };

  useEffect(() => {
    if (newPaymentReceived) {
      if (checkouts.some(checkout => checkout.id === newPaymentReceived.id)) {
        updateCheckoutInfo(newPaymentReceived.id, newPaymentReceived.cartItems);
      } else {
        setCheckouts(prev => [...prev, newPaymentReceived]);
      }
    }
  }, [newPaymentReceived]);

  useEffect(() => {
    if (data?.body.data) setCheckouts(data.body.data);
  }, [data?.body]);

  return { checkouts, loading };
};