import { LogIn, LogOutIcon } from "lucide-react";
import Link from "next/link";

export function NavbarAuthActions({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  console.log(isAuthenticated);
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
