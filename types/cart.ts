export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  images: Array<string>;
  unitPrice: number;
  quantity: number;
  subTotal: number;
}

export interface Products {
  items: Array<Product>;
}
export type CartIem = Product;

export type CartState = Products;
