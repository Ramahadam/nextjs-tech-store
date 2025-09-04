import Link from "next/link";
import Image from "next/image";
export default function Logo() {
  return (
    <div className="h-10 w-40 relative">
      <Link href="/">
        <Image fill src="/logo.png" alt="logo icon for the company" />
      </Link>
    </div>
  );
}
