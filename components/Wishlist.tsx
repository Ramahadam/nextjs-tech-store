import ProductCard from "./product/ProductCard";
import ProductList from "./product/ProductList";
import { Button } from "./ui/button";
import { TypographyH2 } from "./ui/TypographyH2";

export default function WishList() {
  return (
    <div className=" p-6">
      <TypographyH2>FAVORITS</TypographyH2>
      <ProductList />
      <Button variant="default">Load more</Button>
    </div>
  );
}
