export interface Product {
  id: number;
  vendorId: number;
  categoryId: number;
  name: string;
  price: string;
  stock: number;
  status: string;
  images : Images[];
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  allProducts: Product[];
}

interface Images {
  url: string;
}