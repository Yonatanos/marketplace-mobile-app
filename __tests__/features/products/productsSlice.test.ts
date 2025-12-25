import { CATEGORIES, SORT_ORDER } from '@/constants/config';
import { 
  productsReducer, 
  fetchProductsRequest, 
  fetchProductsSuccess, 
  fetchProductsFailure 
} from '../../../src/features/products/store/productsSlice';
import { Product } from '../../../src/types/product';

type ProductsState = ReturnType<typeof productsReducer>;

describe('Products Reducer Logic', () => {
  const mockInitialState: ProductsState = {
    items: [],
    isProductsLoading: false,
    error: null,
    hasMore: true,
    page: 1,
    searchQuery: '',
    selectedCategory: CATEGORIES.ALL,
    sortOrder: SORT_ORDER.ASC,
    categories: [],
    isCategoriesLoading: false
  };

it('should NOT clear products but set loading to true when fetching page 1', () => {
    const stateWithData: ProductsState = {
      ...mockInitialState,
      items: [{ id: 1, title: 'Old Product' } as Product]
    };

    const action = fetchProductsRequest({ page: 1, selectedCategory: 'electronics' });
    const result = productsReducer(stateWithData, action);

    // Assert: Items should REMAINS (based on your new logic)
    expect(result.items).toHaveLength(1); 
    expect(result.isProductsLoading).toBe(true);
  });

  it('should add products on success', () => {
    const newItems = [{ id: 2, title: 'New Item' } as Product];
    const action = fetchProductsSuccess({ products: newItems, hasMore: false });
    const result = productsReducer(mockInitialState, action);

    expect(result.items).toContainEqual(newItems[0]);
    expect(result.hasMore).toBe(false);
    expect(result.isProductsLoading).toBe(false);
  });

  it('should handle failure', () => {
    const errorMsg = 'Error fetching data';
    const action = fetchProductsFailure(errorMsg);
    const result = productsReducer(mockInitialState, action);

    expect(result.isProductsLoading).toBe(false);
    expect(result.error).toBe(errorMsg);
  });
});
