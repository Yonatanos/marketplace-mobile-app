import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit';
import { Product } from '@/types/product';

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

// Create entity adapter for normalized cart state with O(1) lookups
const cartAdapter = createEntityAdapter<CartItem>();

interface CartState {
  isCheckingOut: boolean;
  checkoutError: string | null;
}

const initialState = cartAdapter.getInitialState<CartState>({
  isCheckingOut: false,
  checkoutError: null,
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.entities[action.payload.id];

      if (existingItem) {
        if (existingItem.quantity < action.payload.stock) {
          cartAdapter.updateOne(state, {
            id: action.payload.id,
            changes: { quantity: existingItem.quantity + 1 },
          });
        }
      } else {
        if (action.payload.stock > 0) {
          cartAdapter.addOne(state, {
            id: action.payload.id,
            product: action.payload,
            quantity: 1,
          });
        }
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.entities[action.payload.id];

      if (item && action.payload.quantity > 0 && action.payload.quantity <= item.product.stock) {
        cartAdapter.updateOne(state, {
          id: action.payload.id,
          changes: { quantity: action.payload.quantity },
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      cartAdapter.removeOne(state, action.payload);
    },
    checkoutRequest: (state) => {
      state.isCheckingOut = true;
      state.checkoutError = null;
    },
    checkoutSuccess: (state) => {
      state.isCheckingOut = false;
      state.checkoutError = null;
      cartAdapter.removeAll(state);
    },
    checkoutFailure: (state, action: PayloadAction<string>) => {
      state.isCheckingOut = false;
      state.checkoutError = action.payload;
    },
    clearCart: (state) => {
      cartAdapter.removeAll(state);
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  checkoutRequest,
  checkoutFailure,
  checkoutSuccess,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

// Export adapter for use in selectors
export { cartAdapter };
