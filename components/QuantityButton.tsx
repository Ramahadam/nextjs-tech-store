import { Button } from "@/components/ui/button";
import { CartIem } from "@/types/cart";
import { Minus, Plus } from "lucide-react";

export default function QuantityButton({ quantity, id }: CartIem) {
  console.log(id);
  return (
    <div className="flex items-center border rounded-md justify-between w-fit h-8">
      <Button size="icon" variant="ghost">
        <Minus className="size-3" />
      </Button>
      {quantity}
      <Button size="icon" variant="ghost">
        <Plus className="size-3" />
      </Button>
    </div>
  );
}
