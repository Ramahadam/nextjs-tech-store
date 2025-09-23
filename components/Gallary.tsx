"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { useState } from "react";

interface ImagesType {
  images: Array<string>;
}

export default function Gallary({ images }: ImagesType) {
  const [displayedImage, setDisplayedImage] = useState(images?.at(0));
  return (
    <div className="gallary flex flex-col gap-18 items-center ">
      <figure className="bg-white p-8">
        <Image
          priority
          src={`${displayedImage}`}
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
            onClick={() => setDisplayedImage(el)}
            className={`bg-white h-fit max-w-fit px-0 ${
              el == displayedImage && "border border-primary"
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
