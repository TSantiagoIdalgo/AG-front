import {User} from '#src/common/interfaces/review.interface.ts';
import {configureStore} from '@reduxjs/toolkit';
import {enableMapSet} from 'immer';
import fetchQueueSlice, {IFetchQueue} from './reducers/fetch-queue-slice';
import userReducer from './reducers/user-slice';
import cartReducer, { ICartSlice } from './reducers/cart-slice';
import websocketSlice, { IWebsocketSlice } from './reducers/websocket-slice';

export interface IState {
  user: {
    data: User;
    loading: boolean;
  },
  fetchQueue: IFetchQueue,
  userCart: ICartSlice,
  websocket: IWebsocketSlice
}

enableMapSet();

export const store = configureStore({
  reducer: {
    fetchQueue: fetchQueueSlice,
    user: userReducer,
    userCart: cartReducer,
    websocket: websocketSlice
  }
});