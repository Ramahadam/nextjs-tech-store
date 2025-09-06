import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";

export default function CartItems() {
  return (
    <article className="border  border-lightGray rounded-md p-4 md:max-w-xl md:mx-auto">
      <header className="">
        <p className="uppercase text-sm">my bag</p>
        <p className="text-sm uppercase text-gray-400">2 items</p>
      </header>
      <hr className="border-lightGray my-2" />
      <div>
        <div className="flex justify-between">
          <div className="flex gap-6 items-center">
            <figure className="bg-accent w-20 h-auto py-4 rounded-sm">
              <Image
                src="/hp-laptop.png"
                alt="laptop"
                width={0}
                height={0}
                priority
                sizes="vw"
                className="w-full"
              />
            </figure>

            <figcaption className="text-xs">
              <p className="font-medium mb-2">Laptop Lenovo </p>
              <p className=" mb-3 opacity-50">Lorem ipsum dolor sit.</p>
              <div className="flex items-center border rounded-md justify-between w-fit h-8">
                <Button size="icon" variant="ghost">
                  <Minus className="size-3" />
                </Button>
                {3}
                <Button size="icon" variant="ghost">
                  <Plus className="size-3" />
                </Button>
              </div>
            </figcaption>
          </div>

          <div className="flex flex-col items-center  text-[0.7rem]">
            <Button variant="ghost" className="opacity-45 gap-0">
              <Trash className="size-3 opacity" />
              <span>Remove</span>
            </Button>
            <p className="font-semibold tracking-wide ">{1600} AED</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-sm self-end">
          <p>Estimated Total </p>
          <p className="font-medium text-xs"> 1200 AED</p>
        </div>
        <Button className="self-end">Checkout</Button>
      </div>
    </article>
  );
}
