// types/product.ts
export interface PackSize {
  id: string;
  label: string;
  quantity: number;
  stripCount?: number;
  price: number;
  originalPrice: number;
  discount: number;
  inStock?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  strength?: string;
  brand: string;
  originalPrice: number;
  currentPrice: number;
  discount: number;
  deliveryTime?: string;
  category: string;
  imageUrl: string;
  rating?: number;
  reviewsCount?: number;
  inStock?: boolean;
  description?: string;
  images?: string[];
  specifications?: Record<string, string>;
  benefits?: string[];
  usage?: string;
  packSizes?: PackSize[];
  defaultPackSizeId?: string;
}
