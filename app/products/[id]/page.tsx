import { ResolvingMetadata } from "next";

interface MetaPropsType {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function getProductById(id: number) {
  return null;
}

export async function generateMetadata(
  { params, searchParams }: MetaPropsType,
  parent: ResolvingMetadata
) {
  const id = (await params).id;

  const product = await getProductById(2);

  return {
    title: "%PRODUCT_TITLE%",
    description: "%PRODUCT_DESCRIPTION%",
  };
}

export default function Page() {
  return <div>single product</div>;
}
