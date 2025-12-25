import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/types';

export const selectProductsState = (state: RootState) => state.products;

export const selectProducts = (state: RootState) => state.products.items;

export const selectProductById = createSelector(
  [selectProducts, (_state: RootState, productId: number) => productId],
  (products, productId) => products.find((product) => product.id === productId),
);
