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
import { FC } from "react";
import { CartSummary } from "./CartSummary";
import { CartItems } from "./CartItems";
import { CartHeader } from "./CartHeader";

export default function CartLayout() {
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
    return (
      <div className="flex items-center justify-center md:my-8">
        <Spinner className="text-2xl" />
        Please wait
      </div>
    );
  }

  // Empty cart return instruction message
  if (items && items?.length === 0) return <EmptyCart />;

  return (
    <article className="border min-h-dvh shadow-2xl shadow-accent-300 md:shadow-none  border-lightGray rounded-md p-4 m-4 md:m-0 md:max-w-xl md:mx-auto my-8 md:my-16">
      <CartHeader items={items} />

      <CartItems
        items={items}
        isRemoving={isRemoving}
        onRemoveItem={handleRemoveItem}
      />

      {items?.length > 0 && <CartSummary items={items} />}
    </article>
  );
}
