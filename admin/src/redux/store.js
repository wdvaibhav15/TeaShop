import { configureStore } from "@reduxjs/toolkit";
import feedbackReducer from "./feedbackSlice";
import allordersSlice from "./allordersSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
    allOrders: allordersSlice,
    user: userSlice,
  },
});

export default store;