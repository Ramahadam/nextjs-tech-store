import { CartIem, CartState } from "@/types/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  items: [
    {
      id: 1,
      title: "Dell XPS 15",
      description: "15-inch laptop with Intel Core i7, 16GB RAM, 512GB SSD",
      category: "laptops",
      image: "/hp-laptop.png",
      unitePrice: 1500,
      quantity: 1,
      subTotal: 1500,
    },
    {
      id: 2,
      title: "MacBook Pro 14” M3",
      description: "Apple MacBook Pro with M3 chip, 16GB RAM, 1TB SSD",
      category: "laptops",
      image: "/hp-laptop.png",
      unitePrice: 2200,
      quantity: 2,
      subTotal: 4400,
    },
    {
      id: 3,
      title: "Lenovo ThinkCentre M70s",
      description: "Desktop tower PC with Intel Core i5, 8GB RAM, 256GB SSD",
      category: "desktops",
      image: "/hp-laptop.png",
      unitePrice: 900,
      quantity: 1,
      subTotal: 900,
    },
  ],
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

    removeFromCart: (state, action: PayloadAction<CartIem>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        if (state.items[index] && state.items[index]?.quantity > 1) {
          state.items[index].quantity -= 1;
          state.items[index].subTotal =
            state.items[index].unitePrice * state.items[index].quantity;
        }
      } else {
        state.items.splice(index, 1);
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
