"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

import { Spinner } from "../ui/spinner";
export function NavbarCartIcon({
  isAuthenticated,
  showCartBadge,
  itemsCount,
  isFetching,
  isLoading,
}) {
  return (
    <Link href={isAuthenticated ? "/cart" : "/login?redirectTo=/cart"}>
      <Button variant="ghost" size="icon" className="relative shrink-0">
        <ShoppingCart className="h-5 w-5" />
        <span className="sr-only">Cart</span>
        <span className="absolute opacity-100  -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
          {isFetching || isLoading ? (
            <Spinner className="absolute" />
          ) : (
            <Badge
              variant="destructive"
              className={cn(
                "h-5 w-5 flex items-center justify-center p-0 text-xs",
                !showCartBadge && "h-0 w-0 opacity-0"
              )}
            >
              {itemsCount}
            </Badge>
          )}
        </span>
      </Button>
    </Link>
  );
}
