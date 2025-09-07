import { Badge } from "../ui/badge";
import { TypographyH2 } from "../ui/TypographyH2";
import QuantityButton from "../QuantityButton";
import RatingDisplay from "../RatingDisplay";
import Gallary from "../Gallary";
import WishlistButton from "../WishilistButton";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

export default function ProductDetails() {
  const images = ["hp-laptop-0.png", "hp-laptop-1.png", "hp-laptop-2.png"];
  return (
    <article className="grid sm:grid-cols-2 bg-accent w-full py-10">
      <Gallary images={images} />

      <div className="">
        <TypographyH2>Laptop HP 12th generations</TypographyH2>
        <Badge className="mt-4 mb-6 text-md font-bold">1200 AED</Badge>
        <RatingDisplay />

        <p className="my-2">
          Availability:{" "}
          <span className="font-bold text-green-400">Instock</span>
        </p>
        <p className="my-2">Category : Laptop</p>
        <p className="my-2">
          Description:
          <span className=" inline-block">
            Lorem ipsum dolor sit amet consectetur elite . Ut, consequuntur!
          </span>
        </p>

        <div className="flex gap-2 flex-col mt-4">
          <span className="inline-block text-md">Quantity</span>
          <QuantityButton />
        </div>

        <footer className="mt-8">
          <article className="flex items-center gap-4">
            <Button className="bg-primary-custom" size="lg">
              <ShoppingCart />
              <span>Add to cart</span>
            </Button>

            <span className="bg-white rounded-md ">
              <WishlistButton />
            </span>
          </article>
        </footer>
      </div>
    </article>
  );
}
