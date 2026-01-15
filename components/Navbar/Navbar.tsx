"use client";

import { Search } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar";

import { NavbarMobile } from "./NavbarMobile";
import { NavbarDesktop } from "./NavbarDesktop";
import { NavbarCartIcon } from "./NavbarCartIcon";
import { NavbarUserIcon } from "./NavbarUserIcon";
import { NavbarAuthActions } from "./NavbarAuthActions";

export function Navbar() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto flex justify-between  md:just h-16 items-center gap-2 sm:gap-4 px-3 sm:px-4 ">
        <NavbarMobile />
        {/* Desktop Navigation */}
        <NavbarDesktop />
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
        <div className="flex items-center gap-6">
          <NavbarUserIcon />
          <NavbarCartIcon />
          <NavbarAuthActions />
        </div>
      </div>
    </header>
  );
}
