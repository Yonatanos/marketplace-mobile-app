import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { fetchProducts } from '@/api/mockApi';
import { fetchProductsRequest, fetchProductsSuccess, fetchProductsFailure, fetchCategoriesRequest, setCategories, fetchCategoriesComplete } from './productsSlice';
import { FetchProductsResponse } from '@/types/product';
import { STRINGS } from '@/constants/strings';
import { CATEGORIES, TIMING } from '@/constants/config';
import { logger } from '@/utils/logger';
import { fetchCategories } from '@/api/mockApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { FetchProductsParams } from '@/types/api';

function* handleFetchProducts(action: ReturnType<typeof fetchProductsRequest>): SagaIterator {
  try {
    const { page, searchQuery = STRINGS.common.empty, selectedCategory = CATEGORIES.ALL, sortOrder } = action.payload;
    const limit = 10;

    if (searchQuery !== STRINGS.common.empty && page === 1) {
      yield delay(TIMING.DEBOUNCE_DELAY);
    }

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

export function* watchProductsSaga(): SagaIterator {
  yield takeLatest(fetchProductsRequest.type, handleFetchProducts);

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
