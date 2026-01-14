import { User } from "lucide-react";
import Link from "next/link";

export function NavbarUserIcon() {
  return (
    <Link href="/me">
      <User className="h-5 w-5" />
      <span className="sr-only">Account</span>
    </Link>
  );
}
