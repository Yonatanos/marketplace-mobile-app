import { SortOrder } from '@/constants/config';
export interface RawProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  reviews: { rating: number }[];
}

export interface RawApiResponse {
  products: RawProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface FetchProductsParams {
  page: number;
  searchQuery?: string;
  selectedCategory?: string;
  sortOrder?: SortOrder;
}
