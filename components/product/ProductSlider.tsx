import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./ProductCard";
import { products } from "@/lib/api";

export default function ProductSlider() {
  const renderedPopularProducts = products?.items?.map((item) => (
    <CarouselItem
      className="xs:basis-1 md:basis-1/2 lg:basis-1/3"
      key={item.id}
    >
      <ProductCard {...item} />
    </CarouselItem>
  ));
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm md:max-w-[40rem] lg:min-w-5xl lg:max-w-7xl "
    >
      <CarouselContent className="mx-auto">
        {renderedPopularProducts}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
