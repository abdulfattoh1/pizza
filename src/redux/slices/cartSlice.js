import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action) {
      const newItem = state.items.find((obj) => obj.id === action.payload.id);

      if (newItem) {
        newItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    diminisheCount(state, action) {
      const foundID = state.items.find(
        (count) => count.id === action.payload.id
      );
      if (foundID) {
        foundID.count--;
      }
    },
    removeItems(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

// ! This is created selector which is watching fo pizzaData

export const selectPizzaData = (id) => (state) =>
  state.cart.items.find((obj) => obj.id === id);

export const {
  addItems,
  removeItems,
  diminisheCount,
  increaseCount,
  clearItems,
} = cartSlice.actions;

export default cartSlice.reducer;
