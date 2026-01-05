import { Button } from "@/components/ui/button";
import { FC } from "react";
import { calcCartTotalAmount } from "./cart.utils";
import { CartItem } from "./cart.schema";

type CartSummaryProp = {
  items: CartItem[];
};

export const CartSummary: FC<CartSummaryProp> = ({ items }) => {
  console.log(items);
  const totalAmount = calcCartTotalAmount(items);
  return (
    <footer className="flex flex-col gap-4 mt-4">
      <div className="text-md self-end">
        <p className="mb-2"> Estimated Total </p>

        <p className="font-bold text-sm"> {totalAmount} AED</p>
      </div>
      <div className="flex justify-end gap-4 ">
        <Button variant="outline">Clear cart</Button>
        <Button className="self-end">Checkout</Button>
      </div>
    </footer>
  );
};
