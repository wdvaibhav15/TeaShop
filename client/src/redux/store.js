
// import { configureStore } from "@reduxjs/toolkit";

// import userSlice from "./userSlice";
// import productSlice from "./productSlice";
// import cartSlice from "./cartSlice";
// import wishlistSlice from "./wishlistSlice";
// import paymentSlice from "./paymentSlice";
// import searchSlice from "./searchSlice";
// import cafeSettingSlice from "./cafeSettingSlice";

// // Safely restore saved arrays from localStorage.
// const getStoredItems = (key) => {
//   try {
//     const savedItems = localStorage.getItem(key);
//     const parsedItems = savedItems ? JSON.parse(savedItems) : [];

//     return Array.isArray(parsedItems) ? parsedItems : [];
//   } catch (error) {
//     console.error(`Failed to restore ${key}:`, error);
//     return [];
//   }
// };

// // Restore cart and wishlist before Redux initializes.
// const preloadedState = {
//   cart: {
//     cartItems: getStoredItems("camellia_cartItems"),
//   },
//   wishlist: {
//     wishlistItems: getStoredItems("camellia_wishlistItems"),
//   },
// };

// export const store = configureStore({
//   reducer: {
//     user: userSlice,
//     product: productSlice,
//     cart: cartSlice,
//     wishlist: wishlistSlice,
//     payment: paymentSlice,
//     search: searchSlice,
//     cafeSetting: cafeSettingSlice,
//   },

//   preloadedState,
// });

// // Automatically save the latest cart and wishlist after every Redux action.
// store.subscribe(() => {
//   try {
//     const state = store.getState();

//     localStorage.setItem(
//       "camellia_cartItems",
//       JSON.stringify(state.cart.cartItems)
//     );

//     localStorage.setItem(
//       "camellia_wishlistItems",
//       JSON.stringify(state.wishlist.wishlistItems)
//     );
//   } catch (error) {
//     console.error("Failed to save cart or wishlist:", error);
//   }
// });
import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";
import productSlice from "./productSlice";
import cartSlice, { setCartItems } from "./cartSlice";
import wishlistSlice, {
  setWishlistItems,
} from "./wishlistSlice";
import paymentSlice from "./paymentSlice";
import searchSlice from "./searchSlice";
import cafeSettingSlice from "./cafeSettingSlice";

const getUserId = (user) =>
  user?._id ||
  user?.id ||
  user?.user?._id ||
  user?.user?.id ||
  null;

const readItems = (key) => {
  try {
    const value = localStorage.getItem(key);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const getInitialUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

const initialUserId = getUserId(getInitialUser());

const cartKey = (id) => `camellia_cart_${id}`;
const wishlistKey = (id) => `camellia_wishlist_${id}`;

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

  preloadedState: {
    cart: {
      cartItems: initialUserId
        ? readItems(cartKey(initialUserId))
        : [],
    },
    wishlist: {
      wishlistItems: initialUserId
        ? readItems(wishlistKey(initialUserId))
        : [],
    },
  },
});

let activeUserId = getUserId(store.getState().user?.user);
let switchingUser = false;

store.subscribe(() => {
  if (switchingUser) return;

  const state = store.getState();
  const nextUserId = getUserId(state.user?.user);

  // A login, logout, or account switch occurred.
  if (nextUserId !== activeUserId) {
    activeUserId = nextUserId;
    switchingUser = true;

    store.dispatch(
      setCartItems(
        nextUserId ? readItems(cartKey(nextUserId)) : []
      )
    );

    store.dispatch(
      setWishlistItems(
        nextUserId ? readItems(wishlistKey(nextUserId)) : []
      )
    );

    switchingUser = false;
    return;
  }

  // Never save one user's data into a shared or anonymous key.
  if (!activeUserId) return;

  try {
    localStorage.setItem(
      cartKey(activeUserId),
      JSON.stringify(state.cart.cartItems)
    );

    localStorage.setItem(
      wishlistKey(activeUserId),
      JSON.stringify(state.wishlist.wishlistItems)
    );
  } catch (error) {
    console.error("Could not persist user data:", error);
  }
});