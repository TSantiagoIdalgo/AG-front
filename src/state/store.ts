import { User } from "#src/common/interfaces/review.interface.ts";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/user-slice';

export interface IUserState {
    user: User
}

export const store = configureStore({
  reducer: {
    user: userReducer
  }
});