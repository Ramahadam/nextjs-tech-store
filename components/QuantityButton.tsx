"use client";
import { useAppDispatch } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import {
  addToCart,
  decreaseItemQuantity,
  increaseItemQuantity,
} from "@/features/cart/cartSlice";
import { CartIem } from "@/types/cart";
import { Minus, Plus } from "lucide-react";

export default function QuantityButton({ ...item }: CartIem) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center border rounded-md justify-between w-fit h-8">
      <Button
        size="icon"
        variant="ghost"
        onClick={() => dispatch(decreaseItemQuantity(item.id))}
      >
        <Minus className="size-3" />
      </Button>
      {item.quantity}
      <Button
        size="icon"
        variant="ghost"
        onClick={() => dispatch(increaseItemQuantity(item.id))}
      >
        <Plus className="size-3" />
      </Button>
    </div>
  );
}
