"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import Image from "next/image";
import QuantityButton from "../../components/QuantityButton";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Link from "next/link";
import { clearCart, removeFromCart } from "./cartSlice";
import { useGetCartQuery } from "../api/apiSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { Cart, CartItem } from "./cart.schema";
import { useDispatch } from "react-redux";
import { Spinner } from "@/components/ui/spinner";
import { SkeletonCustom } from "@/components/SkeletonCustom";

export default function CartItems() {
  const dispatch = useAppDispatch();
  // Fetch cart from backend
  const { data, isLoading, isFetching } = useGetCartQuery(undefined);
  // Render spinner for loading state
  const { items } = data?.data || [];

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center md:my-8">
        <SkeletonCustom />
      </div>
    );
  }

  if (!isLoading && items?.length === 0) {
    // Update UI

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
  console.log(formattedItems);

  const renderedItems = formattedItems?.map(
    (item: CartItem) => (
      <div className="cart-item" key={item.product.id}>
        <div className="flex justify-between">
          <div className="flex gap-6 items-center">
            <figure className="bg-accent w-20 h-auto py-4 rounded-sm">
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

            <figcaption className="text-xs">
              <p className="font-medium mb-2">{item.product.title} </p>
              <p className=" mb-3 opacity-50">{item.product.description}</p>
              <QuantityButton id={item.product.id} quantity={item.quantity} />
            </figcaption>
          </div>

          <div className="flex flex-col items-center  text-[0.7rem]">
            <Button
              variant="ghost"
              className="opacity-45 gap-0"
              onClick={() => dispatch(removeFromCart(item.product.id))}
            >
              <Trash className="size-3 opacity" />
              <span>Remove</span>
            </Button>
            <p className="font-semibold tracking-wide ">
              {item.product.unitPrice * item.quantity} AED
            </p>
          </div>
        </div>
      </div>
    )
    // console.log(item)
  );

  return (
    <article className="border  border-lightGray rounded-md p-4 md:max-w-xl md:mx-auto">
      <header className="">
        <p className="uppercase text-sm">my bag</p>
        <p className="text-sm uppercase text-gray-400">{items?.length} items</p>
      </header>
      <hr className="border-lightGray my-2" />

      {renderedItems}

      {items?.length > 0 && (
        <footer className="flex flex-col gap-2">
          <div className="text-sm self-end">
            <p>Estimated Total </p>

            <p className="font-medium text-xs"> {totalAmount} AED</p>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => dispatch(clearCart())}>
              Clear cart
            </Button>
            <Button className="self-end">Checkout</Button>
          </div>
        </footer>
      )}
    </article>
  );
}
