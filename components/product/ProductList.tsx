"use client";
import { CartIem, CartState } from "@/types/cart";
import ProductCard from "./ProductCard";
// import { products } from "@/lib/api";
import { useGetAllProductsQuery } from "@/features/api/apiSlice";
import { Skeleton } from "../ui/skeleton";
import { SkeletonCustom } from "../SkeletonCustom";

export default function ProductList({ items }: CartState) {
  const { isLoading, error, data: allProducts } = useGetAllProductsQuery();

  const allItems = items ? items : allProducts?.data?.products;
  const renderedProducts = allItems?.map((item: CartIem) => (
    <ProductCard {...item} key={item._id} />
  ));
  return (
    <article className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto ">
      {isLoading ? <SkeletonCustom /> : renderedProducts}
    </article>
  );
}
