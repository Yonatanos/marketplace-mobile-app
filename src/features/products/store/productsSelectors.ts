import { RootState } from '@/store/types';
import { productsAdapter } from './productsSlice';

export const selectProductsState = (state: RootState) => state.products;

const adapterSelectors = productsAdapter.getSelectors<RootState>(
  (state) => {
    if (!state?.products) {
      return productsAdapter.getInitialState({
        isProductsLoading: false,
        error: null,
        page: 1,
        hasMore: true,
        searchQuery: '',
        selectedCategory: 'All',
        sortOrder: 'asc' as const,
        categories: [],
        isCategoriesLoading: false,
      });
    }

    return state.products;
  }
);

// Export adapter selectors with guaranteed types
export const selectAllProducts = (state: RootState) => {
  const products = adapterSelectors.selectAll(state);

  return products ?? [];
};

export const selectProductEntities = (state: RootState) => {
  const entities = adapterSelectors.selectEntities(state);

  return entities ?? {};
};

export const selectProductIds = (state: RootState) => {
  const ids = adapterSelectors.selectIds(state);

  return ids ?? [];
};

export const selectTotalProducts = (state: RootState) => {
  return adapterSelectors.selectTotal(state) ?? 0;
};

// O(1) lookup by ID - much faster than Array.find()
export const selectProductById = (state: RootState, productId: number) => {
  if (!state) return undefined;
  
  return adapterSelectors.selectById(state, productId);
};

// Backward compatibility - alias selectAll as selectProducts
export const selectProducts = selectAllProducts;
