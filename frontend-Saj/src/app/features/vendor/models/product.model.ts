export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  discount?: number;
  discountType?: '%' | 'flat';
  description?: string;
  stock: number;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  image: string;
  status: 'published' | 'draft' | 'archived';
  variants?: ProductVariant[];
  tags?: string[];
}

export interface ProductVariant {
  type: string;
  options: string;
}

// Payload for creating — no id, no stockStatus (backend derives it)
export type CreateProductPayload = Omit<Product, 'id' | 'stockStatus'>;
