import Link from "next/link";
import { Button } from "./ui/button";
import { TypographyH1 } from "./ui/TypographyH1";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="bg-[#FFFBF7]">
      <div className="flex flex-col  sm:flex-row justify-between items-center gap-16 sm:gap-0 sm:p-8">
        <article className="flex flex-col gap-8 w-full text-center sm:text-left">
          <TypographyH1>
            <span className="block"> Premium </span>Tech,
            <span className="relative inline-block after:absolute after:bg-primary-custom after:top-0 after:right-0 after:bottom-0 after:left-0 after:-z-10 z-10 text-white px-3 after:skew-x-12 after:-skew-y-2 after:scale-y-100">
              Better
            </span>
            <span className="block"> Quality & Prices</span>
          </TypographyH1>
          <Button className="bg-secondary-custom  text-black rounded-2xl uppercase hover:opacity-80 transition duration-300 hover:bg-secondary-custom hover:cursor-pointer self-center sm:self-start">
            <Link href="/products"> shop products</Link>
          </Button>
        </article>
        <figure className="md:self-end">
          <Image
            width={0}
            height={0}
            src="/hero-image.png"
            alt="image shows laptop,desktop and CPU"
            sizes="100vw"
            className="w-[80%] h-auto mx-auto"
          />
        </figure>
      </div>
    </section>
  );
}
