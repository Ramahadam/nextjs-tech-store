"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

import { Spinner } from "../ui/spinner";

import { useAppSelector } from "@/app/hooks";
import { useGetCartQuery } from "@/features/api/apiSlice";

export function NavbarCartIcon() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { data, isFetching, isLoading } = useGetCartQuery(undefined, {
    skip: !isAuthenticated,
  });

  const { items } = data?.data ?? [];

  const itemsCount = Array.isArray(items) ? items.length : 0;

  const showCartBadge = isAuthenticated && itemsCount > 0;
  return (
    <Link
      href={isAuthenticated ? "/cart" : "/login?redirectTo=/cart"}
      className="relative"
    >
      <ShoppingCart className="h-5 w-5" />
      <span className="sr-only">Cart</span>
      <span className="absolute opacity-100  -top-3 -right-3 h-5 w-5 flex items-center justify-center p-0 text-xs">
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
    </Link>
  );
}
