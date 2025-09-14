"use client";
import { CartIem, CartState } from "@/types/cart";
import ProductCard from "./ProductCard";
import { products } from "@/lib/api";

export default function ProductList({ items }: CartState) {
  console.log(items);
  const data = items ? items : products.items;
  const renderedProducts = data?.map((item: CartIem) => (
    <ProductCard {...item} key={item.id} />
  ));
  return (
    <article className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto ">
      {renderedProducts}
    </article>
  );
}
