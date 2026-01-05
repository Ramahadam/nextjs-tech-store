import { Button } from "@/components/ui/button";
import { FC } from "react";

export const CartSummary: FC<{ totalAmount: number }> = ({ totalAmount }) => {
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
