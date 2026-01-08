import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit';
import { Product } from '@/types/product';
import { FetchProductsParams } from '@/types/api';
import { STRINGS } from '@/constants/strings';
import { CATEGORIES, SORT_ORDER, SortOrder } from '@/constants/config';

const productsAdapter = createEntityAdapter<Product>({
  selectId: (product) => product.id,
  // Note: Sorting is handled by API (mockApi.ts) based on user's sortOrder
  // This keeps IDs in insertion order for pagination
});

interface ProductsState {
  isProductsLoading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  searchQuery: string;
  selectedCategory: string;
  sortOrder: SortOrder;
  categories: string[];
  isCategoriesLoading: boolean;
}

const initialState = productsAdapter.getInitialState<ProductsState>({
  isProductsLoading: false,
  error: null,
  page: 1,
  hasMore: true,
  searchQuery: STRINGS.common.empty,
  selectedCategory: CATEGORIES.ALL,
  sortOrder: SORT_ORDER.ASC,
  categories: [],
  isCategoriesLoading: false,
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsRequest: (state, _action: PayloadAction<FetchProductsParams>) => {
      state.isProductsLoading = true;
      state.error = null;
    },

    fetchProductsSuccess: (state, action: PayloadAction<{ products: Product[]; hasMore: boolean }>) => {
      state.isProductsLoading = false;

      if (state.page === 1) {
        // Replace all products for first page
        productsAdapter.setAll(state, action.payload.products);
      } else {
        // Add new products for pagination (adapter auto-handles duplicates)
        productsAdapter.addMany(state, action.payload.products);
      }

      state.hasMore = action.payload.hasMore;
    },

    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.isProductsLoading = false;
      state.error = action.payload;
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.page = Math.max(1, action.payload);
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.page = 1;
    },

    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.page = 1;
    },

    setSortOrder: (state, action: PayloadAction<SortOrder>) => {
      state.sortOrder = action.payload;
      state.page = 1;
    },

    fetchCategoriesRequest: (state) => {
      state.isCategoriesLoading = true;
    },

    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
      state.isCategoriesLoading = false;
    },

    fetchCategoriesComplete: (state) => {
      state.isCategoriesLoading = false;
    },

    resetProducts: () => initialState,
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  setPage,
  setSearchQuery,
  setSelectedCategory,
  setSortOrder,
  resetProducts,
  fetchCategoriesRequest,
  setCategories,
  fetchCategoriesComplete,
} = productsSlice.actions;

export const productsReducer = productsSlice.reducer;

// Export adapter for use in selectors
export { productsAdapter };
