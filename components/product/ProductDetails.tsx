"use client";
import { Badge } from "../ui/badge";
import { TypographyH2 } from "../ui/TypographyH2";
import QuantityButton from "../QuantityButton";
import RatingDisplay from "../RatingDisplay";
import Gallary from "../Gallary";
import WishlistButton from "../../features/wishlist/WishilistButton";
import { Button } from "../ui/button";
import { AlertCircleIcon, ShoppingCart } from "lucide-react";
import { useGetProductByIdQuery } from "@/features/api/apiSlice";
import { Skeleton } from "../ui/skeleton";
import { Message } from "../Message";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export default function ProductDetails({ id }: { id: string }) {
  const { isLoading, data, error } = useGetProductByIdQuery(id);
  if (error) {
    if ("status" in error) {
      const fetchedError = error as FetchBaseQueryError;
      let errMsg: string = "unknow error";

      if (fetchedError.data && typeof fetchedError.data === "object") {
        const serverError = fetchedError.data as { data: { error: string } };
        errMsg = serverError.data.error ?? JSON.stringify(fetchedError.data);
      }
      return (
        <Message
          title={`${errMsg}`}
          variant="destructive"
          icon={AlertCircleIcon}
        >
          <p>{errMsg}</p>
        </Message>
      );
    }

    return <div>{error.message}</div>;
  }

  if (isLoading)
    return (
      <div className="w-full">
        <Skeleton />
      </div>
    );

  const { product } = data?.data || {};

  return (
    <article className="grid sm:grid-cols-2 bg-accent w-full py-10">
      <Gallary images={product?.images} />

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
