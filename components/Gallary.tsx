import Image from "next/image";
import { Button } from "./ui/button";

interface ImagesType {
  images: Array<string>;
}

export default function Gallary({ images }: ImagesType) {
  return (
    <div className="gallary flex flex-col gap-18 items-center ">
      <figure className="bg-white p-8">
        <Image
          priority
          src={images?.at(0)}
          width={0}
          height={0}
          alt="image for laptop & desktop"
          sizes="100vw"
          className="w-[20rem]"
        />
      </figure>
      <figure className="flex gap-6">
        {images.map((el, idx) => (
          <Button
            variant="ghost"
            key={idx}
            className={`bg-white h-fit max-w-fit px-0 ${
              idx == 0 && "border border-primary"
            } `}
          >
            <Image
              priority
              src={`${el}`}
              width={0}
              height={0}
              alt="image for laptop & desktop"
              sizes="100vw"
              className="w-[6rem]"
            />
          </Button>
        ))}
      </figure>
    </div>
  );
}
