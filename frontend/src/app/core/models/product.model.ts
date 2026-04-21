export interface Product {
  id: number;
  vendorId: number;
  categoryId: number;
  name: string;
  price: string;
  stock: number;
  status: string;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  allProducts: Product[];
}
