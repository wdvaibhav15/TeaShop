import { configureStore } from "@reduxjs/toolkit";
import feedbackReducer from "./feedbackSlice";

const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
  },
});

export default store;