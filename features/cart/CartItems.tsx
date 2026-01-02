"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import Image from "next/image";
import QuantityButton from "../../components/QuantityButton";
import { useAppDispatch } from "@/app/hooks";
import Link from "next/link";
// import { clearCart, removeFromCart } from "./cartSlice";
import { useGetCartQuery } from "../api/apiSlice";
import { CartItem } from "./cart.schema";
import { SkeletonCustom } from "@/components/SkeletonCustom";

export default function CartItems() {
  const { data, isLoading, isFetching } = useGetCartQuery(undefined);

  const { items } = data?.data || [];

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center md:my-8">
        <SkeletonCustom />
      </div>
    );
  }

  if (!isLoading && items?.length === 0) {
    return (
      <div className="space-y-8">
        <p>You have not add any item to the cart</p>
        <Button className="bg-secondary-custom">
          <Link href="/">Continue shoping </Link>
        </Button>
      </div>
    );
  }

  const totalAmount = data?.data.totalPrice;
  const formattedItems = items?.map((item: CartItem) => ({
    ...item,
    product: { ...item.product, id: item.product._id },
  }));

  const renderedItems = formattedItems?.map((item: CartItem) => (
    <div className="cart-item" key={item.product.id}>
      <div className="flex justify-between items-start ">
        <div className="flex gap-6  md:items-center md:flex-row flex-col">
          <figure className=" w-40  h-auto">
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
            // onClick={() => dispatch(removeFromCart(item.product.id))}
          >
            <Trash className="size-4 opacity" />
            <span className="text-md">Remove</span>
          </Button>
          <p className="font-semibold tracking-wide ">
            {item.product.unitPrice * item.quantity} AED
          </p>
        </div>
      </div>
    </div>
  ));

  return (
    <article className="border  border-lightGray rounded-md p-4 md:max-w-xl md:mx-auto my-8 md:my-16">
      <header className="">
        <p className="uppercase text-sm">my bag</p>
        <p className="text-sm uppercase text-gray-400">
          <span> {items?.length} </span>
          <span>{items?.length > 1 ? "Items" : "Item"}</span>
        </p>
      </header>
      <hr className="border-lightGray my-4 mb-8" />

      {renderedItems}

      {items?.length > 0 && (
        <footer className="flex flex-col gap-4">
          <div className="text-md self-end">
            <p>Estimated Total </p>

            <p className="font-medium text-sm"> {totalAmount} AED</p>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline">Clear cart</Button>
            <Button className="self-end">Checkout</Button>
          </div>
        </footer>
      )}
    </article>
  );
}
