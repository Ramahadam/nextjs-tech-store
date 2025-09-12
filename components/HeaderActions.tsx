"use client";
import { useAppSelector } from "@/app/hooks";
import CartIcon from "@/features/cart/CartIcon";
import { Heart, User } from "lucide-react";
import Link from "next/link";

export default function HeaderActions() {
  const items = useAppSelector((state) => state.cart.items);

  return (
    <figure className="flex text-accent-foreground md:gap-4">
      <Link href="/wishlist">
        <Heart />
      </Link>
      <span>
        <User />
      </span>
      <Link href="/cart">
        <CartIcon count={items.length} />
      </Link>
    </figure>
  );
}
