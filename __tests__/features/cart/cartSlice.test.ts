import { 
  cartReducer, 
  addToCart, 
  removeFromCart, 
  checkoutSuccess 
} from '../../../src/features/cart/store/cartSlice';
import { Product } from '../../../src/types/product';

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

  const initialState = {
    items: [],
    isCheckingOut: false,
    checkoutError: null,
  };

  it('should prevent adding more items than available in stock', () => {
    let state = cartReducer(initialState, addToCart(mockProduct));

    state = cartReducer(state, addToCart(mockProduct));
    // Third attempt should be blocked by logic
    state = cartReducer(state, addToCart(mockProduct));

    expect(state.items[0].quantity).toBe(2);
  });

  it('should remove item from cart completely', () => {
    let state = cartReducer(initialState, addToCart(mockProduct));

    expect(state.items).toHaveLength(1);

    state = cartReducer(state, removeFromCart(mockProduct.id));
    
    expect(state.items).toHaveLength(0);
  });

  it('should calculate total amount correctly', () => {
    let state = cartReducer(initialState, addToCart(mockProduct));
    const anotherProduct: Product = { ...mockProduct, id: 2, price: 50 };

    state = cartReducer(state, addToCart(anotherProduct));

    const total = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    expect(total).toBe(1050);
  });

  it('should clear cart and reset checking out status on success', () => {
    const stateWithItems = { 
      items: [{ product: mockProduct, quantity: 1 }],
      isCheckingOut: true,
      checkoutError: 'previous error' 
    };
    
    const newState = cartReducer(stateWithItems, checkoutSuccess());
    
    expect(newState.items).toHaveLength(0);
    expect(newState.isCheckingOut).toBe(false);
    expect(newState.checkoutError).toBeNull();
  });
});