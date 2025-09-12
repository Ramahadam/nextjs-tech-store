"use client";

import { Heart } from "lucide-react";
import { useAppSelector } from "@/app/hooks";
import { Button } from "../../components/ui/button";
import { addToWishlist, removeFromWishlist } from "./wishlistSlice";

function WishlistButton({ id }) {
  const wishlist = useAppSelector((state) => state.wishlist);
  const isInWhishlist = wishlist.items.some((item) => item.id === id);

  const toggleWishlist = () => {
    if (isInWhishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hover:bg-transparent hover:cursor-pointer"
      onClick={() => toggleWishlist()}
    >
      <Heart
        className={`size-6 ${
          isInWhishlist &&
          "fill-primary-custom text-primary-custom hover:text-primary-custom"
        } `}
      />
    </Button>
  );
}

export default WishlistButton;
