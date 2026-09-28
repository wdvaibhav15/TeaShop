import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState: {
    wishlistItems: [],
  },

  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;

      const exists = state.wishlistItems.find(
        (product) => product._id === item._id
      );

      if (!exists) {
        state.wishlistItems.push(item);
      }
    },

    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;