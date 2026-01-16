"use client";
import { useAppSelector } from "@/app/hooks";
import { LogIn, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

import { useAuthActions } from "@/features/auth/hooks/useAuthActions";

export function NavbarAuthActions() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { handleSignout } = useAuthActions();

  return (
    <>
      {isAuthenticated ? (
        <Button
          variant="link"
          className="p-0 cursor-pointer"
          onClick={handleSignout}
        >
          <LogOutIcon className="size-5" />
        </Button>
      ) : (
        <Link href="/login">
          <LogIn className="size-5" />
        </Link>
      )}
    </>
  );
}
