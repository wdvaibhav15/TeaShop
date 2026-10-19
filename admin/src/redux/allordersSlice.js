
import { createSlice } from "@reduxjs/toolkit";

const allOrdersSlice = createSlice({
  name: "allOrders",

  initialState: {
    orders: [],
  },

  reducers: {
    setAllOrders: (state, action) => {
      state.orders = Array.isArray(action.payload)
        ? action.payload
        : [];
    },

    removeOrder: (state, action) => {
      const orderId = action.payload;

      state.orders = state.orders.filter(
        (order) => order._id !== orderId
      );
    },
  },
});

export const { setAllOrders, removeOrder } =
  allOrdersSlice.actions;

export default allOrdersSlice.reducer;
