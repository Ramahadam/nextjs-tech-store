"use client";
import { CartIem, CartState } from "@/types/cart";
import ProductCard from "./ProductCard";
// import { products } from "@/lib/api";
import { useGetAllProductsQuery } from "@/features/api/apiSlice";

export default function ProductList({ items }: CartState) {
  const { isLoading, error, data: allProducts } = useGetAllProductsQuery();

  console.log(allProducts);
  if (isLoading) return <p>Loadding....</p>;

  const allItems = items ? items : allProducts?.data?.products;
  const renderedProducts = allItems?.map((item: CartIem) => (
    <ProductCard {...item} key={item._id} />
  ));
  return (
    <article className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto ">
      {renderedProducts}
    </article>
  );
}
