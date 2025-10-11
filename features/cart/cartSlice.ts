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
          action.payload.unitPrice * existingItem.quantity;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          subTotal: action.payload.unitPrice,
        });
      }
    },

    increaseItemQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.subTotal = existingItem.unitPrice * existingItem.quantity;
      }
    },

    decreaseItemQuantity: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);

      if (index !== -1) {
        if (state.items[index] && state.items[index]?.quantity > 1) {
          state.items[index].quantity -= 1;
          state.items[index].subTotal =
            state.items[index].unitPrice * state.items[index].quantity;
        } else {
          state.items.splice(index, 1);
        }
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);

      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },

    clearCart: () => {
      return initialState;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseItemQuantity,
  increaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
