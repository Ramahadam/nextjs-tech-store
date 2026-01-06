"use client";
import { Button } from "@/components/ui/button";
import { calcCartTotalAmount } from "./cart.utils";
import { useCart } from "./hooks/useCart";

export function CartSummary() {
  const { items, clearCart } = useCart();

  const totalAmount = calcCartTotalAmount(items);

  async function handleClearCart() {
    clearCart();
  }

  return (
    <footer className="flex flex-col gap-4 mt-4">
      <div className="text-md self-end">
        <p className="mb-2"> Estimated Total </p>

        <p className="font-bold text-sm"> {totalAmount} AED</p>
      </div>
      <div className="flex justify-end gap-4 ">
        <Button variant="outline" onClick={() => handleClearCart()}>
          Clear cart
        </Button>
        <Button className="self-end">Checkout</Button>
      </div>
    </footer>
  );
}
