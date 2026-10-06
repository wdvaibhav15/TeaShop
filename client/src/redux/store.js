import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import wishlistSlice from "./wishlistSlice";
import paymentSlice from "./paymentSlice";
import searchSlice from "./searchSlice";
import cafeSettingSlice from "./cafeSettingSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        product: productSlice,
        cart: cartSlice,
        wishlist: wishlistSlice,
        payment: paymentSlice,
        search: searchSlice,
        cafeSetting: cafeSettingSlice
        
    },
});