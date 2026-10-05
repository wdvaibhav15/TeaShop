import { createSlice } from "@reduxjs/toolkit";

const allOrdersSlice = createSlice({
  name: "allOrders",

  initialState: {
    orders: [],
  },

  reducers: {
    setAllOrders: (state, action) => {
      state.orders = action.payload;
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
    
    },
  },
}
);

export const { setAllOrders, removeOrder } = allOrdersSlice.actions;

export default allOrdersSlice.reducer;
