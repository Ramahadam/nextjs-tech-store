"use client";
import { Product } from "@/types/cart";
import ProductCard from "./ProductCard";
import { useGetAllProductsQuery } from "@/features/api/apiSlice";
import { SkeletonCustom } from "../SkeletonCustom";

export default function ProductList() {
  const { isLoading, error, data } = useGetAllProductsQuery();

  const products = data?.data.products;

  if (isLoading) {
    return (
      <article className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCustom key={i} />
        ))}
      </article>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-4 text-center text-red-500">
        Could not fetch the products. Please try again later.
      </div>
    );
  }

  return (
    <article className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
      {products?.map((item: Product) => (
        <ProductCard key={item.id} {...item} />
      ))}
    </article>
  );
}
