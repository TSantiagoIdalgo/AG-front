import fetchQueueSlice, { IFetchQueue } from './reducers/fetch-queue-slice';
import filterReducer, { IFilters } from './reducers/filter-slice';
import { User } from "#src/common/interfaces/review.interface.ts";
import { configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from 'immer';
import userReducer from './reducers/user-slice';

export interface IState {
    user: {
      data: User
    },
    filters: IFilters,
    fetchQueue: IFetchQueue
}

enableMapSet();

export const store = configureStore({
  reducer: {
    fetchQueue: fetchQueueSlice,
    filters: filterReducer,
    user: userReducer,
  }
});