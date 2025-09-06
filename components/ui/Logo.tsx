import Link from "next/link";
import Image from "next/image";
export default function Logo({ white = false }) {
  return (
    <div className=" relative">
      <Link href="/">
        <Image
          width={180}
          height={100}
          src={white ? "/logo-white.png" : "/logo.png"}
          alt="logo icon for the company"
        />
      </Link>
    </div>
  );
}
