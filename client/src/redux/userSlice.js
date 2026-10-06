import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  feedbackUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;

      localStorage.setItem(
        "user",
        JSON.stringify(action.payload)
      );
    },

    setFeedBackUser: (state, action) => {
      state.feedbackUser = action.payload;
    },

    logoutUser: (state) => {
      state.user = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const {
  setUser,
  setFeedBackUser,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;