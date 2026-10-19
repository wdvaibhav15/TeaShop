import { configureStore } from "@reduxjs/toolkit";

import feedbackReducer from "./feedbackSlice";
import allOrdersReducer from "./allordersSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
    allOrders: allOrdersReducer,
    user: userReducer,
  },
});

export default store;