import { call, put, takeLatest, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { fetchProducts } from '@/api/mockApi';
import { fetchProductsRequest, fetchProductsSuccess, fetchProductsFailure, fetchCategoriesRequest, setCategories, fetchCategoriesComplete, setPage, setSearchQuery, setSelectedCategory, setSortOrder } from './productsSlice';
import { FetchProductsResponse } from '@/types/product';
import { STRINGS } from '@/constants/strings';
import { CATEGORIES } from '@/constants/config';
import { logger } from '@/utils/logger';
import { fetchCategories } from '@/api/mockApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { FetchProductsParams } from '@/types/api';
import { RootState } from '@/store/types';

function* handleFetchProducts(action: ReturnType<typeof fetchProductsRequest>): SagaIterator {
  try {
    const { page, searchQuery = STRINGS.common.empty, selectedCategory = CATEGORIES.ALL, sortOrder } = action.payload;
    const limit = 10;

    const response: FetchProductsResponse = yield call(
      fetchProducts,
      {
        page,
        limit,
        searchQuery,
        selectedCategory,
        sortOrder,
      }
    );

    yield put(
      fetchProductsSuccess({
        products: response.products,
        hasMore: response.hasMore,
      }),
    );
  } catch (error) {
    logger.error('[productSaga] - handleFetchProducts error:', error);
    yield put(fetchProductsFailure(STRINGS.errors.fetchProducts));
  }
}

function* handleFetchCategories(): SagaIterator {
  try {
    yield put(fetchCategoriesRequest());
    const categories = yield call(fetchCategories);

    yield put(setCategories(categories));
  } catch (error) {
    logger.error('[productSaga] - handleFetchCategories error:', error);
    yield put(fetchCategoriesComplete());
  }
}

function* handleFilterChange(): SagaIterator {
  try {
    // Get the updated state after the filter action
    const state: RootState = yield select();
    const { page, searchQuery, selectedCategory, sortOrder } = state.products;
    
    // Automatically fetch products with new filters
    yield put(fetchProductsRequest({ 
      page, 
      searchQuery, 
      selectedCategory, 
      sortOrder 
    }));
  } catch (error) {
    logger.error('[productSaga] - handleFilterChange error:', error);
  }
}

export function* watchProductsSaga(): SagaIterator {
  yield takeLatest(fetchProductsRequest.type, handleFetchProducts);

  // Auto-fetch when filters change - saga handles the side effect
  yield takeLatest([
    setPage.type,
    setSearchQuery.type, 
    setSelectedCategory.type,
    setSortOrder.type
  ], handleFilterChange);

  yield takeLatest(fetchProductsRequest.type, function* (action: PayloadAction<FetchProductsParams>): SagaIterator {
    try {
      if (action.payload.page === 1 && !action.payload.searchQuery && action.payload.selectedCategory === CATEGORIES.ALL) {
        yield call(handleFetchCategories);
      }
    } catch (error) {
      logger.error('[productSaga] - handleFetchCategories wrapper error:', error);
      yield put(fetchProductsFailure(STRINGS.errors.fetchProducts));
    }
  });
}
