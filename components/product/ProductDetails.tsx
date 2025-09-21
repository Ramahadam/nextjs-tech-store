"use client";
import { Badge } from "../ui/badge";
import { TypographyH2 } from "../ui/TypographyH2";
import QuantityButton from "../QuantityButton";
import RatingDisplay from "../RatingDisplay";
import Gallary from "../Gallary";
import WishlistButton from "../../features/wishlist/WishilistButton";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { useGetProductByIdQuery } from "@/features/api/apiSlice";
import { Skeleton } from "../ui/skeleton";

export default function ProductDetails({ id }: { id: string }) {
  const { isLoading, data, error } = useGetProductByIdQuery(id);
  const images = ["hp-laptop-0.png", "hp-laptop-1.png", "hp-laptop-2.png"];

  if (isLoading)
    return (
      <div className="w-full">
        <Skeleton />;
      </div>
    );

  const { product } = data?.data || {};
  console.log(product);

  return (
    <article className="grid sm:grid-cols-2 bg-accent w-full py-10">
      <Gallary images={product.images} />

      <div className="">
        <TypographyH2>{product.title}</TypographyH2>
        <Badge className="mt-4 mb-6 text-md font-bold">
          {product.unitPrice} AED
        </Badge>
        <RatingDisplay />

        <p className="my-2">
          Availability:{" "}
          <span className="font-bold text-green-400">
            {" "}
            {product.stock > 0 ? "Instock" : "sold"}Instock
          </span>
        </p>
        <p className="my-2">Category : {product.category}</p>
        <p className="my-2">
          Description:
          <span className=" inline-block">{product.description}</span>
        </p>

        <div className="flex gap-2 flex-col mt-4">
          <span className="inline-block text-md">Quantity</span>
          <QuantityButton />
        </div>

        <footer className="mt-8">
          <article className="flex items-center gap-4">
            <Button className="bg-primary-custom" size="lg">
              <ShoppingCart />
              <span>Add to cart</span>
            </Button>

            <span className="bg-white rounded-md ">
              <WishlistButton />
            </span>
          </article>
        </footer>
      </div>
    </article>
  );
}
