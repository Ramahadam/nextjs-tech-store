import { CartIem, CartState } from "@/types/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  items: [],
};

const wishlishSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<CartIem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (!existingItem) {
        state.items.push(action.payload);
      }
    },

    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlishSlice.actions;
export default wishlishSlice.reducer;
