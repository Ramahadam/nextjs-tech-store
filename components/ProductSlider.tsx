import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CardProduct from "./CardProduct";

export default function ProductSlider() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm md:max-w-[40rem] lg:min-w-5xl lg:max-w-7xl:"
    >
      <CarouselContent className="mx-auto">
        <CarouselItem className="xs:basis-1 md:basis-1/2 lg:basis-1/3">
          <CardProduct />
        </CarouselItem>
        <CarouselItem className="xs:basis-1 md:basis-1/2 lg:basis-1/3">
          <CardProduct />
        </CarouselItem>
        <CarouselItem className="xs:basis-1 md:basis-1/2 lg:basis-1/3">
          <CardProduct />
        </CarouselItem>
        <CarouselItem className="xs:basis-1 md:basis-1/2 lg:basis-1/3">
          <CardProduct />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
