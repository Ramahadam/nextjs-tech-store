"use client";
import { Button } from "@/components/ui/button";
import { useUpdateCartQuantityMutation } from "@/features/api/apiSlice";
// import {
//   decreaseItemQuantity,
//   increaseItemQuantity,
// } from "@/features/cart/cartSlice";
import { Minus, Plus } from "lucide-react";

type QuantityButtonType = {
  id: string;
  quantity: number;
};

export default function QuantityButton({ id, quantity }: QuantityButtonType) {
  const [updateCartQuantity] = useUpdateCartQuantityMutation();

  async function handleUpdateCart(productId: string, quantity: number) {
    await updateCartQuantity({ productId, quantity });
  }

  return (
    <div className="flex items-center border rounded-md justify-between w-fit h-8">
      <Button
        size="icon"
        variant="ghost"
        onClick={() => handleUpdateCart(id, quantity - 1)}
      >
        <Minus className="size-3" />
      </Button>
      {quantity}
      <Button
        size="icon"
        variant="ghost"
        onClick={() => handleUpdateCart(id, quantity + 1)}
      >
        <Plus className="size-3" />
      </Button>
    </div>
  );
}
