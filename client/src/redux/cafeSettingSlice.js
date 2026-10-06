import { createSlice } from "@reduxjs/toolkit";

const cafeSettingSlice = createSlice({
  name: "cafe",

  initialState: {
    cafeData: null,
    cafeLoading: false,
  },

  reducers: {
    setCafeData: (state, action) => {
      state.cafeData = action.payload;
    },

    setCafeLoading: (state, action) => {
      state.cafeLoading = action.payload;
    },
  },
});

export const {
  setCafeData,
  setCafeLoading,
} = cafeSettingSlice.actions;

export default cafeSettingSlice.reducer;