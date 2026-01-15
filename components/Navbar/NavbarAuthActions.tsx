import { useAppSelector } from "@/app/hooks";
import { LogIn, LogOutIcon } from "lucide-react";
import Link from "next/link";

export function NavbarAuthActions() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <div>
      <Link href={isAuthenticated ? "/logout" : "/login"}>
        {isAuthenticated ? (
          <span>
            <LogOutIcon />
          </span>
        ) : (
          <span>
            <LogIn />
          </span>
        )}
      </Link>
    </div>
  );
}
