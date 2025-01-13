import { User } from "#src/common/interfaces/review.interface.ts";
import { createSlice } from "@reduxjs/toolkit";

interface IUser {
    data: User | undefined
}

const initialState: IUser = {
  data: undefined
};

export const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    deleteUser: (state) => {
      state.data = undefined;
    },
    getUser: (state, action) => {
      state.data = action.payload;
    },
  }
});

export const { deleteUser, getUser } = userSlice.actions;
export default userSlice.reducer;