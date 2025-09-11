"use client";

import * as React from "react";
import Link from "next/link";

import { useState, useEffect } from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Logo from "./ui/Logo";
import InputSearch from "./InputSearch";
import HeaderActions from "./HeaderActions";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScrollPosition = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPosition);

    return () => window.removeEventListener("scroll", handleScrollPosition);
  }, []);
  return (
    <header
      className={`fixed w-full ${
        scrollPosition > 40 && "bg-lightGray top-0 z-50 py-2"
      }`}
    >
      <nav className=" flex items-center justify-between relative max-w-7xl mx-auto md:gap-4  my-2">
        <Logo />

        <Button
          asChild
          size="icon"
          variant="ghost"
          className="md:hidden z-50 right-0 absolute text-black"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <ul
              className={`md:relative md:flex opacity-0 h-0 md:!gap-8  md:opacity-100 flex-col md:flex-row md:justify-start md:items-center ${
                isMenuOpen && "mobile-menu"
              }   md:pt-0`}
            >
              <NavigationMenuItem>
                <Link href="/laptops" className="text-sm">
                  LAPTOPS
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/desktops" className="text-sm">
                  DESKTOPS
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/cctv" className="text-sm">
                  CCTV
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <article className="flex md:items-center flex-col space-y-4 md:space-y-0 md:space-x-8  items-center md:flex-row">
                  <InputSearch />
                  <HeaderActions />
                </article>
              </NavigationMenuItem>
            </ul>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </header>
  );
}
