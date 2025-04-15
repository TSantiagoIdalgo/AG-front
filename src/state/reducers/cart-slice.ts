import { Cart } from '#modules/cart/interfaces/cart.interface.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ICartSlice {
  cartCount: number;
  cart: Cart | undefined
}

const initialState: ICartSlice = {
  cart: undefined,
  cartCount: 0,
};

export const cartSlice = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    removeCart: (state) => {
      state.cart = undefined;
    },
    setCart: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
    },
    setCartItemsCount: (state, action: PayloadAction<number>) => {
      state.cartCount = action.payload;
    },
  }
});

export const {removeCart, setCart, setCartItemsCount} = cartSlice.actions;
export default cartSlice.reducer;