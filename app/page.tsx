import CallToAction from "@/components/CallToAction";
import FilterSortOperations from "@/components/FilterSortOperations";
import HeroSection from "@/components/HeroSection";
import PopularItemsSection from "@/components/PopularItemsSection";
import ProductList from "@/components/product/ProductList";
export default function Home() {
  return (
    <>
      <HeroSection />
      <FilterSortOperations />
      <ProductList />
      <PopularItemsSection />
      <CallToAction />
    </>
  );
}
