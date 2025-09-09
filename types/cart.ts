export interface CartIem {
  id: number;
  title: string;
  description: string;
  category: "";
  image: string;
  unitePrice: number;
  quantity: number;
  subTotal: number;
}

export interface CartState {
  items: Array<CartIem>;
}
