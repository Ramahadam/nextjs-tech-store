import { CartIem, CartState } from "@/types/cart";
import ProductCard from "./ProductCard";

export const products: CartState = {
  items: [
    {
      id: 1,
      title: "Dell XPS 15",
      description: "15-inch laptop with Intel Core i7, 16GB RAM, 512GB SSD",
      category: "laptops",
      image: "/hp-laptop.png",
      unitePrice: 1500,
      quantity: 1,
      subTotal: 1500,
    },
    {
      id: 2,
      title: "MacBook Pro 14” M3",
      description: "Apple MacBook Pro with M3 chip, 16GB RAM, 1TB SSD",
      category: "laptops",
      image: "/hp-laptop.png",
      unitePrice: 2200,
      quantity: 2,
      subTotal: 4400,
    },
    {
      id: 3,
      title: "Lenovo ThinkCentre M70s",
      description: "Desktop tower PC with Intel Core i5, 8GB RAM, 256GB SSD",
      category: "desktops",
      image: "/hp-laptop.png",
      unitePrice: 900,
      quantity: 1,
      subTotal: 900,
    },
    {
      id: 4,
      title: "HP Spectre x360",
      description: "13.5-inch 2-in-1 laptop with Intel Core i7, 16GB RAM",
      category: "laptops",
      image: "/hp-laptop.png",
      unitePrice: 1400,
      quantity: 1,
      subTotal: 1400,
    },
    {
      id: 5,
      title: "Asus ROG Strix G15",
      description: "Gaming laptop with AMD Ryzen 9, RTX 4070, 16GB RAM",
      category: "laptops",
      image: "/hp-laptop.png",
      unitePrice: 1800,
      quantity: 1,
      subTotal: 1800,
    },
    {
      id: 6,
      title: "Acer Aspire TC-1760",
      description: "Desktop PC with Intel Core i5, 8GB RAM, 512GB SSD",
      category: "desktops",
      image: "/hp-laptop.png",
      unitePrice: 750,
      quantity: 2,
      subTotal: 1500,
    },
    {
      id: 7,
      title: "Apple iMac 24” M1",
      description: "All-in-one desktop with Apple M1 chip, 8GB RAM, 256GB SSD",
      category: "desktops",
      image: "/hp-laptop.png",
      unitePrice: 1300,
      quantity: 1,
      subTotal: 1300,
    },
    {
      id: 8,
      title: "Dell OptiPlex 7090",
      description: "Business desktop with Intel Core i7, 16GB RAM, 512GB SSD",
      category: "desktops",
      image: "/hp-laptop.png",
      unitePrice: 1100,
      quantity: 1,
      subTotal: 1100,
    },
  ],
};

export default function ProductList() {
  const renderedProduct = products.items.map((item) => (
    <ProductCard {...item} key={item.id} />
  ));
  return (
    <article className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto ">
      {renderedProduct}
    </article>
  );
}
