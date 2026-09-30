import { createSlice } from "@reduxjs/toolkit";

const feedbackSlice = createSlice({
  name: "feedback",

  initialState: {
    feedbackUser: [],
  },

  reducers: {
    setFeedBackUser: (state, action) => {
      state.feedbackUser = action.payload;
    },
    removeFeedBackUser: (state, action) => {
      state.feedbackUser = state.feedbackUser.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const { setFeedBackUser, removeFeedBackUser } = feedbackSlice.actions;

export default feedbackSlice.reducer;
