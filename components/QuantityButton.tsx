import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

export default function QuantityButton() {
  return (
    <div className="flex items-center border rounded-md justify-between w-fit h-8">
      <Button size="icon" variant="ghost">
        <Minus className="size-3" />
      </Button>
      {3}
      <Button size="icon" variant="ghost">
        <Plus className="size-3" />
      </Button>
    </div>
  );
}
