import { configureStore } from "@reduxjs/toolkit";
import feedbackReducer from "./feedbackSlice";
import allordersSlice from "./allordersSlice";

const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
    allOrders: allordersSlice,
  },
});

export default store;