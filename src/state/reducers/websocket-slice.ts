import { Cart } from '#modules/cart/interfaces/cart.interface.ts';
import { ProductCheckout } from '#src/common/interfaces/checkout.interface.ts';
import {createSlice} from '@reduxjs/toolkit';

export interface IWebsocketSlice {
    newPayment: Cart | undefined;
    newPaymentReceived: ProductCheckout | undefined
}

export const initialState: IWebsocketSlice = {
  newPayment: undefined,
  newPaymentReceived: undefined
};

export const websocketSlice = createSlice({
  initialState,
  name: 'websocket',
  reducers: {
    clearWebsocketState: (state) => {
      state.newPayment = undefined;
      state.newPaymentReceived = undefined;
    },
    removeNewPayment: (state) => {
      state.newPayment = undefined;
    },
    removeNewPaymentReceived: (state) => {
      state.newPaymentReceived = undefined;
    },
    setNewPayment: (state, payload) => {
      state.newPayment = payload.payload;
    },
    setNewPaymentReceived: (state, payload) => {
      state.newPaymentReceived = payload.payload;
    },
  }
});
export const { clearWebsocketState, removeNewPayment, removeNewPaymentReceived, setNewPayment, setNewPaymentReceived } = websocketSlice.actions;
export default websocketSlice.reducer;