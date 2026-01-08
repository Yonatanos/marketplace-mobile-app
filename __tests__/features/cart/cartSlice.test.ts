import { 
  cartReducer, 
  addToCart, 
  removeFromCart, 
  checkoutSuccess,
  cartAdapter,
  CartItem
} from '../../../src/features/cart/store/cartSlice';
import { Product } from '../../../src/types/product';
import { EntityState } from '@reduxjs/toolkit';

describe('Cart Business Logic', () => {
  const mockProduct: Product = {
      id: 1,
      title: 'iPhone',
      price: 1000,
      stock: 2,
      thumbnail: '',
      description: 'Test description',
      category: 'electronics',
      rating: 4.5,
      ratingCount: 0,
      reviews: [],
      shippingInformation: '1 month'
  };

  // Use adapter's initial state
  const initialState = cartAdapter.getInitialState({
    isCheckingOut: false,
    checkoutError: null,
  });

  // Helper to get all items as array with proper typing
  const getItems = (state: EntityState<CartItem, number>) => cartAdapter.getSelectors().selectAll(state);

  it('should prevent adding more items than available in stock', () => {
    let state = cartReducer(initialState, addToCart(mockProduct));

    state = cartReducer(state, addToCart(mockProduct));
    // Third attempt should be blocked by logic
    state = cartReducer(state, addToCart(mockProduct));

    const items = getItems(state);

    expect(items[0].quantity).toBe(2);
  });

  it('should remove item from cart completely', () => {
    let state = cartReducer(initialState, addToCart(mockProduct));

    expect(state.ids).toHaveLength(1);

    state = cartReducer(state, removeFromCart(mockProduct.id));
    
    expect(state.ids).toHaveLength(0);
  });

  it('should calculate total amount correctly', () => {
    let state = cartReducer(initialState, addToCart(mockProduct));
    const anotherProduct: Product = { ...mockProduct, id: 2, price: 50 };

    state = cartReducer(state, addToCart(anotherProduct));

    const items = getItems(state);
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    expect(total).toBe(1050);
  });

  it('should clear cart and reset checking out status on success', () => {
    // Create state with items using the adapter
    let stateWithItems = cartAdapter.getInitialState({
      isCheckingOut: true,
      checkoutError: 'previous error' as string | null,
    });

    stateWithItems = cartAdapter.addOne(stateWithItems, { 
      product: mockProduct, 
      quantity: 1 
    });
    
    const newState = cartReducer(stateWithItems, checkoutSuccess());
    
    expect(newState.ids).toHaveLength(0);
    expect(newState.isCheckingOut).toBe(false);
    expect(newState.checkoutError).toBeNull();
  });
});
