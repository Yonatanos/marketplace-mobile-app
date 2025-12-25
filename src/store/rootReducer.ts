import { combineReducers } from '@reduxjs/toolkit';
import { productsReducer } from '@/features/products/store/productsSlice';
import { cartReducer } from '@/features/cart/store/cartSlice';

export const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});
