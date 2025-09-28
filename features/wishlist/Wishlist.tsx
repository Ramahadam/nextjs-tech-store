"use client";
import { useAppSelector } from "@/app/hooks";
import ProductList from "../../components/product/ProductList";
import { Button } from "../../components/ui/button";
import { TypographyH2 } from "../../components/ui/TypographyH2";
import ProductCard from "@/components/product/ProductCard";
import { CartIem } from "@/types/cart";
import ResponsiveContainer from "@/components/ResponsiveContainer";

export default function WishList() {
  const { items } = useAppSelector((state) => state.wishlist);
  console.log(items);

  const renderedWhishlist = items?.map((item: CartIem) => (
    <ProductCard {...item} key={item.id} />
  ));

  return (
    <div className="p-6">
      <TypographyH2>FAVORITS</TypographyH2>
      <ResponsiveContainer>{renderedWhishlist}</ResponsiveContainer>
      <Button variant="default">Load more</Button>
    </div>
  );
}
