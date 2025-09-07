import CardProduct from "./CardProduct";
import { Button } from "./ui/button";
import { TypographyH2 } from "./ui/TypographyH2";

export default function WishList() {
  return (
    <div className=" p-6">
      <TypographyH2>FAVORITS</TypographyH2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <CardProduct />
        <CardProduct />
        <CardProduct />
      </div>
      <Button variant="default">Load more</Button>
    </div>
  );
}
