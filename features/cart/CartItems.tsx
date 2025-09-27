"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import Image from "next/image";
import QuantityButton from "../../components/QuantityButton";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Link from "next/link";
import { removeFromCart } from "./cartSlice";

export default function CartItems() {
  const items = useAppSelector((state) => state.cart.items);
  const totalAmount = items.reduce((acum, curr) => acum + curr.subTotal, 0);
  const dispatch = useAppDispatch();

  const renderedItems =
    items.length > 0 ? (
      items?.map((item) => (
        <div className="cart-item" key={item.id}>
          <div className="flex justify-between">
            <div className="flex gap-6 items-center">
              <figure className="bg-accent w-20 h-auto py-4 rounded-sm">
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  width={0}
                  height={0}
                  priority
                  sizes="vw"
                  className="w-full"
                />
              </figure>

              <figcaption className="text-xs">
                <p className="font-medium mb-2">{item.title} </p>
                <p className=" mb-3 opacity-50">{item.description}</p>
                <QuantityButton {...item} />
              </figcaption>
            </div>

            <div className="flex flex-col items-center  text-[0.7rem]">
              <Button
                variant="ghost"
                className="opacity-45 gap-0"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                <Trash className="size-3 opacity" />
                <span>Remove</span>
              </Button>
              <p className="font-semibold tracking-wide ">
                {item.subTotal} AED
              </p>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="space-y-8">
        <p>You have not add any item to the cart</p>
        <Button className="bg-secondary-custom">
          <Link href="/">Continue shoping </Link>
        </Button>
      </div>
    );

  return (
    <article className="border  border-lightGray rounded-md p-4 md:max-w-xl md:mx-auto">
      <header className="">
        <p className="uppercase text-sm">my bag</p>
        <p className="text-sm uppercase text-gray-400">{items.length} items</p>
      </header>
      <hr className="border-lightGray my-2" />

      {renderedItems}

      {items.length > 0 && (
        <footer className="flex flex-col gap-2">
          <div className="text-sm self-end">
            <p>Estimated Total </p>

            <p className="font-medium text-xs"> {totalAmount} AED</p>
          </div>
          <Button className="self-end">Checkout</Button>
        </footer>
      )}
    </article>
  );
}
