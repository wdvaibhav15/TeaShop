
import { createSlice } from "@reduxjs/toolkit";

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to read stored user:", error);
    return null;
  }
};

const initialState = {
  user: getStoredUser(),
  feedbackUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;

      if (action.payload) {
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload)
        );
      } else {
        localStorage.removeItem("user");
      }
    },

    setFeedBackUser: (state, action) => {
      state.feedbackUser = action.payload;
    },

    logoutUser: (state) => {
      state.user = null;
      state.feedbackUser = null;

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
