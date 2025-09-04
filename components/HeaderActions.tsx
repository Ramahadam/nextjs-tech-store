import { Heart, ShoppingCart, User } from "lucide-react";

export default function HeaderActions() {
  return (
    <figure className="flex text-accent-foreground md:gap-4">
      <span>
        <Heart />
      </span>
      <span>
        <User />
      </span>
      <span>
        <ShoppingCart />
      </span>
    </figure>
  );
}
