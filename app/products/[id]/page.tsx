import ProductDetails from "@/components/product/ProductDetails";
import { cache } from "react";

interface MetaPropsType {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export const getProduct = cache(async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DEV_URL}/products/${id}`
  ).then((res) => res.json());

  return res;
});

export async function generateMetadata({ params }: MetaPropsType) {
  const { id } = params;

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
  const id = params.id;

  return (
    <div>
      <ProductDetails id={id} />
    </div>
  );
}
