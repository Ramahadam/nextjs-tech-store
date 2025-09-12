import ProductList from "../../components/product/ProductList";
import { Button } from "../../components/ui/button";
import { TypographyH2 } from "../../components/ui/TypographyH2";

export default function WishList() {
  return (
    <div className="p-6">
      <TypographyH2>FAVORITS</TypographyH2>
      <ProductList />
      <Button variant="default">Load more</Button>
    </div>
  );
}
