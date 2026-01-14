import { User } from "lucide-react";
import { Button } from "../ui/button";

export function NavbarUserIcon() {
  return (
    <Button variant="ghost" size="icon" className="shrink-0">
      <User className="h-5 w-5" />
      <span className="sr-only">Account</span>
    </Button>
  );
}
