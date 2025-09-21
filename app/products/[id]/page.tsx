import ProductDetails from "@/components/product/ProductDetails";
import { ResolvingMetadata } from "next";

interface MetaPropsType {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(
  { params, searchParams }: MetaPropsType,
  parent: ResolvingMetadata
) {
  const { id } = await params;

  const result = await fetch(`${process.env.DEV_URL}/products/${id}`).then(
    (res) => res.json()
  );

  if (result.status !== "success") {
    return {
      title: "Product",
    };
  }

  const { title, description } = result.data.product;

  return {
    title,
    description,
  };
}

export default function Page({ params }: { params: { id: string } }) {
  console.log(process.env.DEV_URL);
  return (
    <div>
      <span>single product </span>

      <ProductDetails />
    </div>
  );
}
