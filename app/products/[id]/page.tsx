import ProductDetails from "@/components/product/ProductDetails";

interface MetaPropsType {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export const getProduct = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DEV_URL}/products/${id}`
  ).then((res) => res.json());

  // if (!res.ok) throw new Error("Failed to fetch the product");
  console.log(res);
  return res;
};

export async function generateMetadata({ params }: MetaPropsType) {
  const id = (await params).id;

  const result = await getProduct(id);

  if (result.status !== "success") {
    return {
      title: "Product",
    };
  }

  const { title, description } = result.data.product;

  return {
    title: title || "Product",
    description: description || "Description",
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = (await params).id;

  return (
    <div>
      <ProductDetails id={id} />
    </div>
  );
}
