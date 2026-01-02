"use client";
import { useAppDispatch } from "@/app/hooks";
import { Button } from "@/components/ui/button";
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
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center border rounded-md justify-between w-fit h-8">
      <Button
        size="icon"
        variant="ghost"
        // onClick={() => dispatch(decreaseItemQuantity(id))}
      >
        <Minus className="size-3" />
      </Button>
      {quantity}
      <Button
        size="icon"
        variant="ghost"
        // onClick={() => dispatch(increaseItemQuantity(id))}
      >
        <Plus className="size-3" />
      </Button>
    </div>
  );
}
