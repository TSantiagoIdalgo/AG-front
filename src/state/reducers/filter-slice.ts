import { createSlice } from "@reduxjs/toolkit";

interface Filters {
    system: string[];
    platform: string[];
    genres: string[];
    orderBy: Record<string, boolean>
}

export interface IFilters {
    data: Filters
}

const initialState: IFilters = {
  data: {
    genres: [],
    orderBy: {},
    platform: [],
    system: [],
  }
};

export const filterSlice = createSlice({
  initialState,
  name: "filters",
  reducers: {
    clearFilters: (state) => {
      state.data = { genres: [], orderBy: {}, platform: [], system: [] };
    },
    setGenres: (state, action) => {
      state.data = { ...state.data, genres: action.payload };
    },
    setOrdersBy: (state, action) => {
      state.data = { ...state.data, orderBy: { [action.payload]: true } };
    },
    setPlatform: (state, action) => {
      state.data = { ...state.data, platform: action.payload };
    },
    setSystem: (state, action) => {
      state.data = { ...state.data, system: action.payload };
    },
  }
});

export const { clearFilters, setGenres, setPlatform, setSystem, setOrdersBy } = filterSlice.actions;
export default filterSlice.reducer;