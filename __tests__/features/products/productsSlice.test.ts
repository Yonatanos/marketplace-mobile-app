import { 
  productsReducer, 
  fetchProductsRequest, 
  fetchProductsSuccess, 
  fetchProductsFailure,
  productsAdapter 
} from '../../../src/features/products/store/productsSlice';
import { Product } from '../../../src/types/product';

type ProductsState = ReturnType<typeof productsReducer>;

// Helper to get products array from entity adapter state
const getProductsArray = (state: ProductsState): Product[] => {
  return productsAdapter.getSelectors().selectAll(state);
};

describe('Products Reducer Logic', () => {
  const mockInitialState: ProductsState = productsReducer(undefined, { type: '@@INIT' });

  it('should NOT clear products but set loading to true when fetching page 1', () => {
    // Start with a state that has one product
    const stateWithData = productsAdapter.setAll(
      mockInitialState,
      [{ id: 1, title: 'Old Product' } as Product]
    );

    const action = fetchProductsRequest({ page: 1, selectedCategory: 'electronics' });
    const result = productsReducer(stateWithData, action);

    // Assert: Products should remain, only loading state changes
    const products = getProductsArray(result);

    expect(products).toHaveLength(1); 
    expect(result.isProductsLoading).toBe(true);
  });

  it('should add products on success', () => {
    const newItems = [{ id: 2, title: 'New Item' } as Product];
    const action = fetchProductsSuccess({ products: newItems, hasMore: false });
    const result = productsReducer(mockInitialState, action);

    const products = getProductsArray(result);

    expect(products).toContainEqual(newItems[0]);
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

  it('should replace all products on page 1 success', () => {
    // Start with existing products
    const stateWithData = productsAdapter.setAll(
      mockInitialState,
      [
        { id: 1, title: 'Old Product 1' } as Product,
        { id: 2, title: 'Old Product 2' } as Product
      ]
    );

    // Set page to 1
    const stateOnPage1 = { ...stateWithData, page: 1 };

    const newProducts = [{ id: 3, title: 'New Product' } as Product];
    const action = fetchProductsSuccess({ products: newProducts, hasMore: true });
    const result = productsReducer(stateOnPage1, action);

    const products = getProductsArray(result);

    expect(products).toHaveLength(1);
    expect(products[0].id).toBe(3);
  });

  it('should append products on page > 1 success', () => {
    // Start with existing products
    const stateWithData = productsAdapter.setAll(
      { ...mockInitialState, page: 2 },
      [{ id: 1, title: 'Existing Product' } as Product]
    );

    const newProducts = [{ id: 2, title: 'New Product' } as Product];
    const action = fetchProductsSuccess({ products: newProducts, hasMore: true });
    const result = productsReducer(stateWithData, action);

    const products = getProductsArray(result);

    expect(products).toHaveLength(2);
    expect(products.map(p => p.id)).toEqual([1, 2]);
  });

  it('should auto-handle duplicate products when paginating', () => {
    // Start with existing products
    const stateWithData = productsAdapter.setAll(
      { ...mockInitialState, page: 2 },
      [{ id: 1, title: 'Product 1' } as Product]
    );

    // Try to add duplicate and new products
    const mixedProducts = [
      { id: 1, title: 'Product 1 Updated' } as Product, // Duplicate ID - will be skipped
      { id: 2, title: 'Product 2' } as Product // New product - will be added
    ];
    const action = fetchProductsSuccess({ products: mixedProducts, hasMore: false });
    const result = productsReducer(stateWithData, action);

    const products = getProductsArray(result);

    // Entity adapter's addMany skips duplicates (doesn't update)
    expect(products).toHaveLength(2);
    expect(products.find(p => p.id === 1)?.title).toBe('Product 1'); // Original title preserved
    expect(products.find(p => p.id === 2)?.title).toBe('Product 2'); // New product added
  });
});
