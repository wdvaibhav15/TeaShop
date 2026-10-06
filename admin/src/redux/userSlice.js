import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");

const userSlice = createSlice({
  name: "user",

  initialState: {
    currentUser: storedUser ? JSON.parse(storedUser) : null,
  },

  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;

      localStorage.setItem(
        "user",
        JSON.stringify(action.payload)
      );
    },

    logoutUser: (state) => {
      state.currentUser = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const {
  setCurrentUser,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;