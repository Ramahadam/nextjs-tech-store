"use client";

import { Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "../../components/ui/button";
import { addToWishlist, removeFromWishlist } from "./wishlistSlice";
import { CartIem } from "@/types/cart";

function WishlistButton({ ...selectedItem }: CartIem) {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist);
  const isInWhishlist = wishlist.items.some(
    (wishlistItem) => wishlistItem.id === selectedItem.id
  );

  const toggleWishlist = () => {
    console.log(isInWhishlist);
    console.log(selectedItem.id);

    if (isInWhishlist) {
      dispatch(removeFromWishlist(selectedItem.id));
    } else {
      dispatch(addToWishlist(selectedItem));
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
