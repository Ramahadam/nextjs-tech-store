// Calculate total amount from List of products

import { CartIem } from "@/types/cart";

export const calcCartTotalAmount = (items: CartIem[]) => {
  return items.reduce(
    (total: number, item: CartIem) => total + item.quantity * item.unitPrice,
    0
  );
};
