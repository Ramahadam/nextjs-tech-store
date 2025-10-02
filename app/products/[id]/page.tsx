import ProductDetails from "@/components/product/ProductDetails";
import { ResolvingMetadata } from "next";
import { cache, use } from "react";

interface MetaPropsType {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const getProduct = cache(async (id: string) => {
  const res = await fetch(`${process.env.DEV_URL}/products/${id}`).then((res) =>
    res.json()
  );

  return res;
});

export async function generateMetadata(
  { params, searchParams }: MetaPropsType,
  parent: ResolvingMetadata
) {
  const { id } = await params;

  const result = await getProduct(id);
  if (result.status !== "success") {
    return {
      title: "Product",
    };
  }

  const { title, description } = result.data.product;

  if (!title && !description) {
    return {
      title: "product",
      description: "product",
    };
  }

  return {
    title,
    description,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = (await params).id;

  return (
    <div>
      <span>single product </span>

      <ProductDetails id={id} />
    </div>
  );
}
