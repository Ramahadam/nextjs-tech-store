"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import RatingDisplay from "../RatingDisplay";
import WishlistButton from "../../features/wishlist/WishilistButton";
import Image from "next/image";
import { FormatNumbers } from "@/lib/utils";
import Link from "next/link";
import { CartIem } from "@/types/cart";
import { useAppDispatch } from "@/app/hooks";
import { addToCart } from "@/features/cart/cartSlice";

function ProductCard(props: CartIem) {
  const { image, title, description, subTotal } = props;
  const dispatch = useAppDispatch();

  return (
    <Card className="w-[18.5rem]   shadow-none border-none">
      <CardHeader className="bg-accent py-4 rounded-md relative h-[12rem] items-center">
        <Link href="/products/1">
          <figure className="justify-self-center">
            <Image
              width={0}
              height={0}
              src={image}
              sizes="vw"
              alt={title}
              className="w-[10rem]"
            />
          </figure>
        </Link>
        <CardAction className="absolute top-0 right-3 bg-white p-[0.25rem] rounded-full flex">
          <WishlistButton />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col px-4">
        <div className="flex items-center justify-between font-bold mb-2">
          <Link href="/products/1" className="">
            {title}
          </Link>
          <p className="">{FormatNumbers(subTotal)} AED</p>
        </div>
        <p className="font-normal text-p16 leading-6 mb-4">{description}</p>
        <RatingDisplay />
      </CardContent>
      <CardFooter className="px-2">
        <Button
          variant="outline"
          className="border-primary rounded-full uppercase "
          onClick={() => dispatch(addToCart(props))}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
