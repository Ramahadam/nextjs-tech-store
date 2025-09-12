import { CartIem, CartState } from "@/types/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartIem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.subTotal =
          action.payload.unitePrice * existingItem.quantity;
      } else {
        state.items.push({
          ...action.payload,
          subTotal: action.payload.unitePrice * action.payload.quantity,
        });
      }
    },

    increaseItemQuantity: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.subTotal = existingItem.unitePrice * existingItem.quantity;
      }
    },

    decreaseItemQuantity: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);

      if (index !== -1) {
        if (state.items[index] && state.items[index]?.quantity > 1) {
          state.items[index].quantity -= 1;
          state.items[index].subTotal =
            state.items[index].unitePrice * state.items[index].quantity;
        } else {
          state.items.splice(index, 1);
        }
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);

      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseItemQuantity,
  increaseItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
