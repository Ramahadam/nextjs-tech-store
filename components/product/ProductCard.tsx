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
import { formatNumbers } from "@/lib/utils";
import Link from "next/link";
import { Product } from "@/types/product";
import { Spinner } from "../ui/spinner";
import { useCart } from "@/features/cart/hooks/useCart";

function ProductCard(props: Product) {
  const { id, images, title, description, unitPrice } = props;
  const image = images?.length ? images?.at(0) : "";
  const { addItem, isAdding } = useCart();

  const handleAddToCart = async () => {
    addItem(props);
  };

  return (
    <Card className="w-74   shadow-none border-none">
      <CardHeader className="bg-accent py-4 rounded-md relative h-48 items-center">
        <Link href={`/products/${id}`}>
          <figure className="justify-self-center">
            {image && (
              <Image
                fill
                src={image}
                sizes="vw"
                alt={title}
                className="object-contain w-40"
              />
            )}
          </figure>
        </Link>
        <CardAction className="absolute top-0 right-3 bg-white p-1 rounded-full flex">
          <WishlistButton {...props} />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col px-4">
        <div className="flex items-center justify-between font-bold mb-2">
          <Link href={`/products/${id}`}>{title}</Link>
          <p className="">{formatNumbers(unitPrice)} AED</p>
        </div>
        <p className="font-normal text-p16 leading-6 mb-4">
          {description ?? ""}
        </p>
        <RatingDisplay />
      </CardContent>
      <CardFooter className="px-2">
        <Button
          variant="outline"
          className="border-primary rounded-full uppercase "
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? <Spinner /> : " Add to cart"}
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
