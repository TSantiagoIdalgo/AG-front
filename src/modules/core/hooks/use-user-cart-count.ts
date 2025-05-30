import { Cart } from '#modules/cart/interfaces/cart.interface.ts';
import { CART_ENDPOINT } from '#src/config/endpoints.ts';
import { useFetchData } from '#src/hooks/use-fetch-data.tsx';
import { handleNewItemSetted, removeCart, removeCartItemCount, setCart, setCartItemsCount } from '#src/state/reducers/cart-slice.ts';
import { IState } from '#src/state/store.ts';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useUserCartCount = () => {
  const { refetch, data } = useFetchData<number>(CART_ENDPOINT.GET.getUserCartProductsCount());
  const { refetch: cartRefetch, data: userCart } = useFetchData<Cart>(CART_ENDPOINT.GET.getUserCart());
  const { cartCount, cart, newItemSetted } = useSelector((state: IState) => state.userCart);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userCart?.body.data) dispatch(setCart(userCart.body.data));
    else if (userCart?.body.error) {
      dispatch(removeCart());
      dispatch(removeCartItemCount());
    };
  }, [userCart?.body]);
  useEffect(() => {
    if (data?.body.data) dispatch(setCartItemsCount(data.body.data));
  }, [data?.body.data]);

  const refetchAll = async () => {
    await refetch();
    await cartRefetch();
    dispatch(handleNewItemSetted(true));
  };
  return { cart, cartCount, newItemSetted, refetch: refetchAll };
};