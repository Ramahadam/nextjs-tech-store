import { CartIemType } from "@/types/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

const initialState: Array<CartIemType> = [
  {
    id: 0,
    title: "",
    image: "",
    category: "",
    description: "",
    unitePrice: 0,
    quantity: 0,
    subTotal: 0,
  },
];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartIemType>) => {
      const existingItem = state.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.subTotal =
          action.payload.unitePrice * existingItem.quantity;
      } else {
        state.push({
          ...action.payload,
          subTotal: action.payload.unitePrice * action.payload.quantity,
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<CartIemType>) => {
      const index = state.findIndex((item) => item.id === action.payload.id);

      if (index !== -1) {
        if (state[index] && state[index]?.quantity > 1) {
          state[index].quantity -= 1;
          state[index].subTotal =
            state[index].unitePrice * state[index].quantity;
        }
      } else {
        state.splice(index, 1);
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
