import filterReducer, { IFilters } from './reducers/filter-slice';
import { User } from "#src/common/interfaces/review.interface.ts";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/user-slice';

export interface IState {
    user: {
      data: User
    },
    filters: IFilters
}

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    user: userReducer,
  }
});