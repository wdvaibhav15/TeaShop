
import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import wishlistSlice from "./wishlistSlice";
import paymentSlice from "./paymentSlice";
import searchSlice from "./searchSlice";
import cafeSettingSlice from "./cafeSettingSlice";

// Safely restore saved arrays from localStorage.
const getStoredItems = (key) => {
  try {
    const savedItems = localStorage.getItem(key);
    const parsedItems = savedItems ? JSON.parse(savedItems) : [];

    return Array.isArray(parsedItems) ? parsedItems : [];
  } catch (error) {
    console.error(`Failed to restore ${key}:`, error);
    return [];
  }
};

// Restore cart and wishlist before Redux initializes.
const preloadedState = {
  cart: {
    cartItems: getStoredItems("camellia_cartItems"),
  },
  wishlist: {
    wishlistItems: getStoredItems("camellia_wishlistItems"),
  },
};

export const store = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    payment: paymentSlice,
    search: searchSlice,
    cafeSetting: cafeSettingSlice,
  },

  preloadedState,
});

// Automatically save the latest cart and wishlist after every Redux action.
store.subscribe(() => {
  try {
    const state = store.getState();

    localStorage.setItem(
      "camellia_cartItems",
      JSON.stringify(state.cart.cartItems)
    );

    localStorage.setItem(
      "camellia_wishlistItems",
      JSON.stringify(state.wishlist.wishlistItems)
    );
  } catch (error) {
    console.error("Failed to save cart or wishlist:", error);
  }
});
