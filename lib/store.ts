import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/cartSlice";
import wishlistReducer from "@/features/wishlist/wishlistSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

// Infer the type of `store`

export type AppStore = typeof store;

// Infer the dispatch store

export type AppDispatch = typeof store.dispatch;

// Infer the root store
export type RootState = ReturnType<typeof store.getState>;
