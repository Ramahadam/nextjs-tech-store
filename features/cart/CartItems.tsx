import { CartItem } from "./cart.schema";
import Image from "next/image";
import CartQuantityButton from "@/features/cart/CartQuantityButton";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useCart } from "./hooks/useCart";

export function CartItems() {
  const { items, removeItem, isRemoving } = useCart();

  return (
    <div className="flex flex-col gap-8 md:gap-8 pb-8 border-b-2 ">
      {items?.map((item: CartItem) => (
        <div
          className="cart-item not-last:border-b not-last:pb-8 md:not-last:border-none"
          key={item.product._id}
        >
          <div className="flex justify-between items-start  ">
            <div className="flex md:gap-6  md:items-center md:flex-row flex-col">
              <figure className="max-w-20 min-w-20 md:max-w-30  md:max-h-30">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.title}
                  width={0}
                  height={0}
                  priority
                  sizes="vw"
                  className="w-full"
                />
              </figure>

              <figcaption className="text-sm">
                <p className="font-medium mb-2">{item.product.title} </p>
                <p className=" mb-3 opacity-50 md:max-w-[90%]">
                  {item.product.description}
                </p>
                <CartQuantityButton
                  id={item.product.id}
                  quantity={item.quantity}
                />
              </figcaption>
            </div>

            <div className="flex flex-col items-center  text-sm">
              <Button
                variant="ghost"
                className="opacity-70 gap-0 text-red-400 text-md"
                onClick={() => removeItem(item?.product?._id)}
                disabled={isRemoving}
              >
                {isRemoving ? (
                  <Spinner />
                ) : (
                  <p className="flex items-center gap-1">
                    <Trash className="size-4 opacity" />
                    <span className="text-md">Remove</span>
                  </p>
                )}
              </Button>
              <p className="font-semibold tracking-wide ">
                {item.product.unitPrice * item.quantity} AED
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
