import { createSelector } from '@reduxjs/toolkit';
import { CartItem, cartAdapter } from './cartSlice';
import { RootState } from '@/store/types';

// Get adapter's built-in selectors with O(1) performance
// Defensive: ensure state and state.cart exist before accessing
const adapterSelectors = cartAdapter.getSelectors<RootState>(
  (state) => {
    if (!state?.cart) {
      return cartAdapter.getInitialState({ 
        isCheckingOut: false, 
        checkoutError: null 
      });
    }

    return state.cart;
  }
);

// Export adapter selectors with guaranteed types
// selectAll returns array - but we guarantee it's never undefined
export const selectCartItems = (state: RootState) => {
  const items = adapterSelectors.selectAll(state);

  return items ?? [];
};

export const selectCartItemEntities = (state: RootState) => {
  const entities = adapterSelectors.selectEntities(state);

  return entities ?? {};
};

export const selectCartItemIds = (state: RootState) => {
  const ids = adapterSelectors.selectIds(state);

  return ids ?? [];
};

export const selectTotalCartItems = (state: RootState) => {
  return adapterSelectors.selectTotal(state) ?? 0;
};

export const selectIsCheckingOut = (state: RootState) => state.cart?.isCheckingOut ?? false;

export const selectCartTotalAmount = createSelector([selectCartItems], (items) =>
  items.reduce((sum: number, item: CartItem) => sum + item.product.price * item.quantity, 0),
);

// O(1) lookup by product ID - much faster than Array.find()
export const selectCartItemQuantity = (state: RootState, productId: number) => {
  if (!state) return 0;
  
  const item = adapterSelectors.selectById(state, productId);

  return item ? item.quantity : 0;
};
