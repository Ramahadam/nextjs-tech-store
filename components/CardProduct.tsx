import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import RatingDisplay from "./RatingDisplay";
import Wishlist from "./Wishilist";
import Image from "next/image";
import { FormatNumbers } from "@/lib/utils";

function CardProduct() {
  return (
    <Card className="w-[18.5rem]   shadow-none border-none">
      <CardHeader className="bg-accent py-4 rounded-md relative h-[12rem] items-center">
        <figure className="justify-self-center">
          <Image
            width={0}
            height={0}
            src="/hp-laptop.png"
            sizes="vw"
            alt={"laptop photo"}
            className="w-[10rem]"
          />
        </figure>
        <CardAction className="absolute top-0 right-3 bg-white p-[0.25rem] rounded-full flex">
          <Wishlist />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col px-4">
        <div className="flex items-center justify-between font-bold mb-2">
          <p className="">Lapotp Lenovo</p>
          <p className="">{FormatNumbers(12000)} AED</p>
        </div>
        <p className="font-normal text-p16 leading-6 mb-4">
          Whereas disregard and contempt 12 gen
        </p>
        <RatingDisplay />
      </CardContent>
      <CardFooter className="px-2">
        <Button
          variant="outline"
          className="border-primary rounded-full uppercase "
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CardProduct;
