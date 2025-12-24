import { Review } from "./review";

interface LpatopSpecs {
  cpu: string;
  ram: string;
  screen: string;
  storage: string;
}
interface DesktopSpecs {
  cpu: string;
  ram: string;
  storage: string;
  powerSupply?: string;
  connectivity?: string[];
  weight?: string;
}
interface CCTVSpecs {
  connectivity: string;
  nightVision: boolean;
  resolution: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  reviews?: Array<Review>;
  stock: number;
  images: Array<string>;
  unitPrice: number;
  quantity: number;
  subTotal?: number;
  brand?: string;
  specs?: LpatopSpecs | DesktopSpecs | CCTVSpecs;
}

export type Products = Array<Product>;
