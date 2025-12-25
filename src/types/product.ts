export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  ratingCount: number;
  reviews: string[];
  stock: number;
  thumbnail: string;
  shippingInformation: string;
}

export interface FetchProductsResponse {
  products: Product[];
  hasMore: boolean;
  total: number;
}
