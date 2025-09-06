import Link from "next/link";
import { TypographyH4 } from "./ui/TypographyH4";
import { InputWithButton } from "./ui/InputWithButton";
import Logo from "./ui/Logo";

function Footer() {
  return (
    <footer className="bg-primary w-full text-lightGray">
      <article className="max-w-7xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-center sm:text-left gap-8 lg:py-8 ">
        <menu>
          <TypographyH4>Links</TypographyH4>
          <li className="mt-2">
            <Link href="#" className="text-md">
              Laptops
            </Link>
          </li>
          <li>
            <Link href="#" className="text-md">
              Desktops
            </Link>
          </li>
          <li>
            <Link href="#" className="text-md">
              Printers
            </Link>
          </li>
        </menu>

        <div className="space-y-2">
          <TypographyH4>News letter</TypographyH4>
          <InputWithButton />
        </div>

        <menu>
          <TypographyH4>Connect</TypographyH4>
          <li className="mt-2">
            <Link href="#" className="text-md">
              facebook
            </Link>
          </li>
          <li>
            <Link href="#" className="text-md">
              Twitter
            </Link>
          </li>
          <li>
            <Link href="#" className="text-md">
              Gmail
            </Link>
          </li>
        </menu>
        <menu>
          <TypographyH4>Inquires</TypographyH4>
          <li className="mt-2">
            <Link href="#" className="text-md">
              supp@ecom.com
            </Link>
          </li>
          <li>
            <Link href="#" className="text-md">
              info@info.com
            </Link>
          </li>
        </menu>
      </article>
      <figure className="flex items-center justify-center self-start mt-8 sm:mt-0">
        <Logo white={true} />
      </figure>
    </footer>
  );
}

export default Footer;
