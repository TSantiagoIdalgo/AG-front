import { CART_ENDPOINT } from '#src/config/endpoints.ts';
import { useFetchData } from '#src/hooks/use-fetch-data.tsx';
import { setCartItemsCount } from '#src/state/reducers/cart-slice.ts';
import { IState } from '#src/state/store.ts';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useUserCartCount = () => {
  const { refetch, data } = useFetchData<number>(CART_ENDPOINT.GET.getUserCartProductsCount());
  const { cartCount } = useSelector((state: IState) => state.userCart);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.body.data) dispatch(setCartItemsCount(data.body.data));
  }, [data?.body.data]);

  return { cartCount, refetch };
};