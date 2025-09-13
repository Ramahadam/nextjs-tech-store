"use client";
import { useAppSelector } from "@/app/hooks";
import CartIcon from "@/features/cart/CartIcon";
import { Heart, User } from "lucide-react";
import Link from "next/link";

export default function HeaderActions() {
  const items = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  return (
    <figure className="flex text-accent-foreground md:gap-4">
      <Link href="/wishlist">
        <Heart className={`${wishlistItems.length && "fill-red-500 "}`} />
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
