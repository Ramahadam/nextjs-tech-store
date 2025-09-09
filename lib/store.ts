import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Infer the type of `store`

export type AppStore = typeof store;

// Infer the dispatch store

export type AppDispatch = typeof store.dispatch;

// Infer the root store
export type RootState = ReturnType<typeof store.getState>;
