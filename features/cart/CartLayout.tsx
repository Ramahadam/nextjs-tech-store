"use client";
import { Spinner } from "@/components/ui/spinner";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { CartSummary } from "./CartSummary";
import { CartItems } from "./CartItems";
import { CartHeader } from "./CartHeader";
import { useCart } from "./hooks/useCart";

export default function CartLayout() {
  const { isBusy, items, removeItem, isRemoving, clearCart } = useCart();

  // Display spinner if busy = isLoading | isFetching | isUninitialized
  if (isBusy) {
    return (
      <div className="flex items-center justify-center md:my-8">
        <Spinner className="text-2xl" />
        Please wait
      </div>
    );
  }

  if (items && items?.length === 0) return <EmptyCart />;

  return (
    <article className="border min-h-dvh shadow-2xl shadow-accent-300 md:shadow-none  border-lightGray rounded-md p-4 m-4 md:m-0 md:max-w-xl md:mx-auto my-8 md:my-16">
      <CartHeader />
      <CartItems />
      <CartSummary items={items} onClearCart={clearCart} />
    </article>
  );
}
