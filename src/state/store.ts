import fetchQueueSlice, { IFetchQueue } from './reducers/fetch-queue-slice';
import { User } from "#src/common/interfaces/review.interface.ts";
import { configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from 'immer';
import userReducer from './reducers/user-slice';

export interface IState {
    user: {
      data: User
    },
    fetchQueue: IFetchQueue
}

enableMapSet();

export const store = configureStore({
  reducer: {
    fetchQueue: fetchQueueSlice,
    user: userReducer,
  }
});