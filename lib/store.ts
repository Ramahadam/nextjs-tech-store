import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/cartSlice";
import wishlistReducer from "@/features/wishlist/wishlistSlice";
import { apiSlice } from "@/features/api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

import userReducer from "@/features/user/userSlice";
import authReducer from "@/features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the type of `store`

export type AppStore = typeof store;

// Infer the dispatch store

export type AppDispatch = typeof store.dispatch;

// Infer the root store
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
