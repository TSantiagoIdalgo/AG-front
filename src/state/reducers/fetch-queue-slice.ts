import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IFetchQueue {
  activeRequests: string[];
}

const initialState: IFetchQueue = {
  activeRequests: []
};

export const fetchQueueSlice = createSlice({
  initialState,
  name: 'fetchQueue',
  reducers: {
    addRequest: (state, action: PayloadAction<string>) => {
      state.activeRequests.push(action.payload);
    },
    removeRequest: (state, action: PayloadAction<string>) => {
      state.activeRequests = state.activeRequests.filter((req) => req !== action.payload);
    }
  }
});

export const {addRequest, removeRequest} = fetchQueueSlice.actions;
export default fetchQueueSlice.reducer;