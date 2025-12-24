"use client";
import ProductCard from "./ProductCard";
import { useGetAllProductsQuery } from "@/features/api/apiSlice";
import { SkeletonCustom } from "../SkeletonCustom";
import ResponsiveContainer from "../ResponsiveContainer";
import { Product } from "@/types/product";

export default function ProductList() {
  const { isLoading, error, data } = useGetAllProductsQuery();
  const products = data?.data.products;

  console.log(data);

  if (isLoading) {
    return (
      <ResponsiveContainer>
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCustom key={i} />
        ))}
      </ResponsiveContainer>
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
    <ResponsiveContainer>
      {products?.map((item: Product) => (
        <ProductCard key={item.id} {...item} />
      ))}
    </ResponsiveContainer>
  );
}
