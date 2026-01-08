"use client";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { CART_MIN_QTY } from "./cart.constants";
import { useCart } from "./hooks/useCart";

type CarQuantityButtonType = {
  id: string;
  quantity: number;
};

export default function CartQuantityButton({
  id,
  quantity,
}: CarQuantityButtonType) {
  const { updateCartQuantity, isUpdatingItemQty, removeItem } = useCart();

  const handleDecrease = async (productId: string, quantity: number) => {
    if (quantity <= CART_MIN_QTY) return removeItem(productId);
    await updateCartQuantity({ productId, quantity: quantity - 1 });
  };

  const handleIncrease = async (productId: string, quantity: number) => {
    // TODO: CART_MAX_QTY feature prof
    await updateCartQuantity({ productId, quantity: quantity + 1 });
  };

  return (
    <div className="flex items-center border rounded-md justify-between w-fit h-8">
      <Button
        size="icon"
        variant="ghost"
        className="cursor-pointer"
        onClick={() => handleDecrease(id, quantity)}
        disabled={isUpdatingItemQty}
      >
        {quantity <= CART_MIN_QTY ? (
          <Trash className="size-4 text-red-500" />
        ) : (
          <Minus className="size-3" />
        )}
      </Button>
      {quantity}
      <Button
        size="icon"
        variant="ghost"
        onClick={() => handleIncrease(id, quantity)}
        disabled={isUpdatingItemQty}
        className="cursor-pointer"
      >
        <Plus className="size-3" />
      </Button>
    </div>
  );
}
