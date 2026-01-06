"use client";
import { Button } from "@/components/ui/button";
import { useUpdateCartQuantityMutation } from "@/features/api/apiSlice";
import { Minus, Plus } from "lucide-react";
import { CART_MIN_QTY } from "./cart.constants";

type CarQuantityButtonType = {
  id: string;
  quantity: number;
};

export default function CartQuantityButton({
  id,
  quantity,
}: CarQuantityButtonType) {
  const [updateCartQuantity, { isLoading, isError, error, isSuccess }] =
    useUpdateCartQuantityMutation();

  const handleDecrease = async (productId: string, quantity: number) => {
    if (quantity <= CART_MIN_QTY) return;
    await updateCartQuantity({ productId, quantity: quantity - 1 });
  };

  const handleIncrease = async (productId: string, quantity: number) => {
    // TODO: CART_MAX_QTY feature prof
    await updateCartQuantity({ productId, quantity: quantity + 1 });
  };

  // TODO:Later will use sooner to display success and error messages

  return (
    <div className="flex items-center border rounded-md justify-between w-fit h-8">
      <Button
        size="icon"
        variant="ghost"
        onClick={() => handleDecrease(id, quantity)}
        disabled={isLoading || quantity <= CART_MIN_QTY}
      >
        <Minus className="size-3" />
      </Button>
      {quantity}
      <Button
        size="icon"
        variant="ghost"
        onClick={() => handleIncrease(id, quantity)}
        disabled={isLoading}
      >
        <Plus className="size-3" />
      </Button>
    </div>
  );
}
