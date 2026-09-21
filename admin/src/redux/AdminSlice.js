import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    user: null,
    isAdmin: false, // Tracks whether the app is in Admin view mode
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    toggleAdminRole: (state) => {
      state.isAdmin = !state.isAdmin;
    },
  },
});

export const { setUser, setIsAdmin, toggleAdminRole } = adminSlice.actions;
export default adminSlice.reducer;