import { Cart } from '#modules/cart/interfaces/cart.interface.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ICartSlice {
  cartCount: number;
  cart: Cart | undefined;
  newItemSetted: boolean;
}

const initialState: ICartSlice = {
  cart: undefined,
  cartCount: 0,
  newItemSetted: false
};

export const cartSlice = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    handleNewItemSetted: (state, action) => {
      state.newItemSetted = action.payload;
    },
    removeCart: (state) => {
      state.cart = undefined;
    },
    removeCartItemCount: (state) => {
      state.cartCount = 0;
    },
    setCart: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
    },
    setCartItemsCount: (state, action: PayloadAction<number>) => {
      state.cartCount = action.payload;
    },
  }
});

export const {removeCart, setCart, setCartItemsCount, handleNewItemSetted, removeCartItemCount} = cartSlice.actions;
export default cartSlice.reducer;