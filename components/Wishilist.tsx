"use client";

import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

function Wishlist() {
  const [isAdded, setIsAdded] = useState(false);

  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className="hover:bg-transparent "
      onClick={() => setIsAdded((prev) => !prev)}
    >
      <Heart
        className={`${
          isAdded &&
          "fill-primary-custom text-primary-custom hover:text-primary-custom"
        } `}
      />
    </Button>
  );
}

export default Wishlist;
