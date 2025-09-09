import { Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

export default function HeaderActions() {
  return (
    <figure className="flex text-accent-foreground md:gap-4">
      <span>
        <Heart />
      </span>
      <span>
        <User />
      </span>
      <Link href="/cart">
        <ShoppingCart />
      </Link>
    </figure>
  );
}
