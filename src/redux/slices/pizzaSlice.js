import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizza = createAsyncThunk(
  "users/fetchByIdStatus",
  async (params) => {
    const { categoryIndex, sortIndex, searchValue, currentPage, categoryId } =
      params;
    const { data } = await axios.get(
      `https://63007f9d59a8760a757b47b1.mockapi.io/items?page=${
        currentPage.num
      }&limit=4${
        categoryId > 0 ? categoryIndex : ""
      }${sortIndex}&${searchValue}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading", // loading | success | error
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizza.pending]: (state) => {
      state.state = "loading";
      state.items = [];
    },
    [fetchPizza.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizza.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
