import { createSelector } from '@reduxjs/toolkit';
import { CartItem } from './cartSlice';
import { RootState } from '@/store/types';

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectIsCheckingOut = (state: RootState) => state.cart.isCheckingOut;

export const selectCartTotalAmount = createSelector([selectCartItems], (items) =>
  items.reduce((sum: number, item: CartItem) => sum + item.product.price * item.quantity, 0),
);

export const selectCartTotalCount = createSelector([selectCartItems], (items) =>
  items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
);

export const selectCartItemQuantity = (state: RootState, productId: number) => {
  const item = state.cart.items.find((item: CartItem) => item.product.id === productId);

  return item ? item.quantity : 0;
};
