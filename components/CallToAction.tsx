import Image from "next/image";
import { Button } from "./ui/button";
import { TypographyH1 } from "./ui/TypographyH1";
import Link from "next/link";

function CallToAction() {
  return (
    <article className="bg-secondary overflow-hidden mt-20">
      <div className="wrapper flex items-center justify-between flex-col sm:flex-row mx-auto max-w-7xl">
        <div className="text-center sm:text-left sm:max-w-[60%] p-4 space-y-4">
          <TypographyH1>Grap Upto 50% off on selected items</TypographyH1>

          <Button
            asChild
            className="uppercase rounded-full bg-primary-custom sm:text-lg sm:px-4 sm:py-8 "
          >
            <Link href="/products">shop discount</Link>
          </Button>
        </div>

        <figure className="relative  ">
          <Image
            src="/hero-image.png"
            width={0}
            height={0}
            alt="image for laptop & desktop"
            sizes="100vw"
            className="w-[60%] max-h-[20rem] md:w-[100%] mx-auto"
          />

          <div className="overlay hidden sm:block absolute top-0 right-0 bottom-0 left-0 bg-primary-custom opacity-40 bg-clip-border -skew-x-12 scale-150"></div>
        </figure>
      </div>
    </article>
  );
}

export default CallToAction;
