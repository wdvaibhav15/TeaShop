
import { createSlice } from "@reduxjs/toolkit";

const allOrdersSlice = createSlice({
  name: "allOrders",

  initialState: {
    orders: [],
  },

  reducers: {
    // Store all fetched orders
    setAllOrders: (state, action) => {
      state.orders = action.payload || [];
    },

    // Remove an order by its ID
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order._id !== action.payload
      );
    },
  },
});

export const { setAllOrders, removeOrder } = allOrdersSlice.actions;

export default allOrdersSlice.reducer;
