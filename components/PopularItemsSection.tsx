import ProductSlider from "./product/ProductSlider";
import { TypographyH2 } from "./ui/TypographyH2";

export default function PopularItemsSection() {
  return (
    <div className="max-w-7xl mx-auto mt-20">
      <TypographyH2>Most Popular </TypographyH2>
      <ProductSlider />
    </div>
  );
}
