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
  nightVision: string;
  resolution: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  images: Array<string>;
  unitPrice: number;
  quantity: number;
  subTotal?: number;
  specs?: LpatopSpecs | DesktopSpecs | CCTVSpecs;
}

export type Products = Array<Product>;
