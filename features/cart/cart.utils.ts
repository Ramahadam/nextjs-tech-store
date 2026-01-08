// Calculate total amount from List of products

import { CartItem } from "./cart.schema";

export const calcCartTotalAmount = (items: CartItem[]) => {
  return items.reduce(
    (total, item) => total + item.quantity * item.unitPrice,
    0
  );
};
