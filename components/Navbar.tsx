"use client";

import Link from "next/link";
import { Menu, Search, User, Heart, ShoppingCart } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useGetCartQuery } from "@/features/api/apiSlice";
import { addToCart } from "@/features/cart/cartSlice";
import { cn } from "@/lib/utils";
import { Spinner } from "./ui/spinner";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Fetch user related cart
  const { data, isFetching, isLoading } = useGetCartQuery(undefined, {
    skip: !isAuthenticated,
  });
  console.log(data);

  const itemsCount = data?.data?.items.length ?? 0;

  const showCartBadge = isAuthenticated && itemsCount > 0;

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto flex justify-between  md:just h-16 items-center gap-2 sm:gap-4 px-3 sm:px-4 ">
        <div className="flex">
          {/* Mobile Hamburger Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden shrink-0"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[350px]">
              <nav className="flex flex-col gap-4 mt-6 ml-4">
                <div className="flex flex-col gap-2">
                  <Link
                    href="/products"
                    className="text-foreground hover:text-primary transition-colors py-2 text-sm "
                    onClick={() => setIsOpen(false)}
                  >
                    Products
                  </Link>
                  <Link
                    href="/deals"
                    className="text-foreground hover:text-primary transition-colors py-2 text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Deals
                  </Link>
                  <Link
                    href="/support"
                    className="text-foreground hover:text-primary transition-colors py-2 text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Support
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-base sm:text-lg shrink-0"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-bold">L</span>
            </div>
            <span className="hidden sm:inline-block">Logo</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex ">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/products">Products</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/deals">Deels</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/support">Support</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <SidebarGroup className="py-0 w-40 md:w-60">
          <SidebarGroupContent className="relative">
            <Label htmlFor="search" className="sr-only">
              Search
            </Label>
            <SidebarInput
              id="search"
              placeholder="Search "
              className="pl-8 text-sm"
            />
            <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* User Icon */}
          <Button variant="ghost" size="icon" className="shrink-0">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>

          {/* Favorites Icon - hidden on very small screens  TODO add my favourit to User Profile → “My Favorites” (Recommended)*/}
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 hidden xs:flex "
          >
            <Heart className="h-5 w-5 " />
            <span className="sr-only">Favorites</span>
          </Button>

          {/* Cart Icon with Badge */}

          <Link href={isAuthenticated ? "/cart" : "/login?redirectTo=/cart"}>
            <Button variant="ghost" size="icon" className="relative shrink-0">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              <span className="absolute opacity-100  -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {!showCartBadge ? (
                  <Spinner className="absolute" />
                ) : (
                  <Badge
                    variant="destructive"
                    className={cn(
                      "h-5 w-5 flex items-center justify-center p-0 text-xs"
                    )}
                  >
                    {itemsCount}
                  </Badge>
                )}
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
