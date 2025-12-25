import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isCheckingOut: boolean;
  checkoutError: string | null;
}

const initialState: CartState = {
  items: [],
  isCheckingOut: false,
  checkoutError: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find((item) => item.product.id === action.payload.id);

      if (existingItem) {
        if (existingItem.quantity < action.payload.stock) {
          existingItem.quantity += 1;
        }
      } else {
        if (action.payload.stock > 0) {
          state.items.push({ product: action.payload, quantity: 1 });
        }
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find((item) => item.product.id === action.payload.id);

      if (item && action.payload.quantity > 0 && action.payload.quantity <= item.product.stock) {
        item.quantity = action.payload.quantity;
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
    },
    checkoutRequest: (state) => {
      state.isCheckingOut = true;
      state.checkoutError = null;
    },
    checkoutSuccess: (state) => {
      state.isCheckingOut = false;
      state.checkoutError = null;
      state.items = [];
    },
    checkoutFailure: (state, action: PayloadAction<string>) => {
      state.isCheckingOut = false;
      state.checkoutError = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
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
