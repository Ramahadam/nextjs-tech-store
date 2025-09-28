import { ShoppingCart } from "lucide-react";

type CartIconProps = {
  count?: number; // number of items in the cart
};

export default function CartIcon({ count = 0 }: CartIconProps) {
  return (
    <div className="relative inline-block">
      {/* Cart Icon */}
      <ShoppingCart className="w-6 h-6 text-gray-700" />

      {/* Badge - only show if count > 0 */}
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow-md">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </div>
  );
}
