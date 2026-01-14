"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

export function NavbarMobile({ isOpen, setIsOpen }) {
  return (
    <div className="flex">
      {/* Mobile Hamburger Menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden shrink-0">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-70 sm:w-87.5">
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
  );
}
