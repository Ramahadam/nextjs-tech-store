"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import Image from "next/image";
import QuantityButton from "../../components/QuantityButton";
import { useAppSelector } from "@/app/hooks";
import Link from "next/link";
// import { clearCart, removeFromCart } from "./cartSlice";
import { useGetCartQuery, useRemoveFromCartMutation } from "../api/apiSlice";
import { CartItem } from "./cart.schema";
import { Spinner } from "@/components/ui/spinner";
import { Product } from "@/types/product";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { calcCartTotalAmount } from "./cart.utils";

export default function CartItems() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { data, isLoading, isFetching, isUninitialized } = useGetCartQuery(
    undefined,
    {
      skip: !isAuthenticated,
    }
  );
  const [removeFromCart, { isLoading: isRemoving, isSuccess }] =
    useRemoveFromCartMutation();

  const items = data?.data.items;

  // Handle Remove Item

  const handleRemoveItem = async (productId: string) => {
    await removeFromCart({ productId });
  };

  // Rendeer spinner in loading and fetching state
  if (isLoading || isFetching || isUninitialized) {
    console.log("items", items);
    return (
      <div className="flex items-center justify-center md:my-8">
        <Spinner className="text-2xl" />
        Please wait
      </div>
    );
  }

  // Empty cart return instruction message
  if (items && items?.length === 0) return <EmptyCart />;

  const totalAmount = calcCartTotalAmount(items);

  const formattedItems = items?.map((item: CartItem) => ({
    ...item,
    product: { ...item.product, id: item.product._id },
  }));

  const renderedItems = formattedItems?.map((item: CartItem) => (
    <div
      className="cart-item not-last:border-b-1 not-last:pb-8 md:not-last:border-none"
      key={item.product.id}
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
            <QuantityButton id={item.product.id} quantity={item.quantity} />
          </figcaption>
        </div>

        <div className="flex flex-col items-center  text-sm">
          <Button
            variant="ghost"
            className="opacity-70 gap-0 text-red-400 text-md"
            onClick={() => handleRemoveItem(item?.product?._id)}
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
  ));

  return (
    <article className="border min-h-dvh shadow-2xl shadow-accent-300 md:shadow-none  border-lightGray rounded-md p-4 m-4 md:m-0 md:max-w-xl md:mx-auto my-8 md:my-16">
      <header className="">
        <p className="uppercase text-sm">my bag</p>
        <p className="text-sm uppercase text-gray-400">
          <span> {items?.length} </span>
          <span>{items?.length > 1 ? "Items" : "Item"}</span>
        </p>
      </header>
      <hr className="border-lightGray my-4 mb-8" />

      <div className="flex flex-col gap-8 md:gap-8 pb-8 border-b-2 ">
        {renderedItems}
      </div>

      {items?.length > 0 && (
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
      )}
    </article>
  );
}
