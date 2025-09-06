import Image from "next/image";
import { Button } from "./ui/button";
import { TypographyH1 } from "./ui/TypographyH1";
import Link from "next/link";

function CallToAction() {
  return (
    <article className="bg-secondary overflow-hidden h-fit ">
      <div className="wrapper flex items-center flex-col sm:flex-row">
        <div className="text-center sm:text-left sm:max-w-[60%] p-4 space-y-4">
          <TypographyH1>Grap Upto 50% off on selected items</TypographyH1>

          <Button asChild className="uppercase rounded-full bg-primary-custom ">
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
            className="w-[60%] max-h-[20rem] mx-auto"
          />

          <div className="overlay hidden sm:block absolute top-0 right-0 bottom-0 left-0 bg-primary-custom opacity-15 bg-clip-border -skew-x-12 scale-150"></div>
        </figure>
      </div>
    </article>
  );
}

export default CallToAction;
