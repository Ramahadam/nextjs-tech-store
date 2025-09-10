"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import Image from "next/image";
import QuantityButton from "../../components/QuantityButton";
import { useAppSelector } from "@/app/hooks";

export default function CartItems() {
  const items = useAppSelector((state) => state.cart.items);
  const totalAmount = items.reduce((acum, curr) => acum + curr.subTotal, 0);

  const renderedItems = items?.map((item) => (
    <div className="cart-item" key={item.id}>
      <div className="flex justify-between">
        <div className="flex gap-6 items-center">
          <figure className="bg-accent w-20 h-auto py-4 rounded-sm">
            <Image
              src={item.image}
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
          <Button variant="ghost" className="opacity-45 gap-0">
            <Trash className="size-3 opacity" />
            <span>Remove</span>
          </Button>
          <p className="font-semibold tracking-wide ">{item.subTotal} AED</p>
        </div>
      </div>
    </div>
  ));

  return (
    <article className="border  border-lightGray rounded-md p-4 md:max-w-xl md:mx-auto">
      <header className="">
        <p className="uppercase text-sm">my bag</p>
        <p className="text-sm uppercase text-gray-400">2 items</p>
      </header>
      <hr className="border-lightGray my-2" />

      {renderedItems}

      <footer className="flex flex-col gap-2">
        <div className="text-sm self-end">
          <p>Estimated Total </p>
          <p className="font-medium text-xs"> {totalAmount} AED</p>
        </div>
        <Button className="self-end">Checkout</Button>
      </footer>
    </article>
  );
}
