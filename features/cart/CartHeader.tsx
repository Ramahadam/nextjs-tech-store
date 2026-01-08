import { useCart } from "./hooks/useCart";

export function CartHeader() {
  const { items } = useCart();
  return (
    <>
      <header>
        <p className="uppercase text-sm">my bag</p>
        <p className="text-sm uppercase text-gray-400">
          <span> {items?.length} </span>
          <span>{items?.length > 1 ? "Items" : "Item"}</span>
        </p>
      </header>
      <hr className="border-lightGray my-4 mb-8" />
    </>
  );
}
