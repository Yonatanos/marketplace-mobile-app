import { put, takeLatest, takeEvery, call, delay, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { checkoutRequest, checkoutSuccess, checkoutFailure, addToCart } from './cartSlice';
import { Product } from '@/types/product';
import { fetchProductsRequest } from '@/features/products/store/productsSlice';
import Toast from 'react-native-toast-message';
import get from 'lodash-es/get';
import { CheckoutServerCode, DEFAULT_CHECKOUT_ERROR, CHECKOUT_ERROR_MESSAGES } from '@/constants/checkoutErrors';
import { PAGINATION, TIMING } from '@/constants/config';
import { STRINGS } from '@/constants/strings';
import { goBack } from '@/navigation/NavigationService';
import { RootState } from '@/store/types';
import { selectProducts, selectProductsState } from '@/features/products/store/productsSelectors';

function* handleCheckout() {
  try {
    // Simulate network delay
    yield delay(TIMING.CHECKOUT_DELAY);
    yield put(checkoutSuccess());

    yield call(goBack);
    yield delay(100);

    Toast.show({
      type: 'success',
      text1: STRINGS.toast.orderPlaced,
      text2: STRINGS.toast.orderSuccess,
    });
    
    const { searchQuery, selectedCategory, sortOrder } = yield select(selectProducts);

    yield put(fetchProductsRequest({
      page: 1,
      searchQuery,
      selectedCategory,
      sortOrder,
    }));
  } catch (error) {
    const statusCode = get(error, 'status') as number | undefined;
    const errorMessage =
      statusCode && CHECKOUT_ERROR_MESSAGES[statusCode] ? CHECKOUT_ERROR_MESSAGES[statusCode] : DEFAULT_CHECKOUT_ERROR;

    yield put(checkoutFailure(errorMessage));

    Toast.show({
      type: 'error',
      text1: STRINGS.toast.orderFailed,
      text2: errorMessage,
    });

    if (statusCode === CheckoutServerCode.OUT_OF_STOCK) {
      yield put(fetchProductsRequest({ page: PAGINATION.INITIAL_PAGE }));
    }
  }
}

function* handleNavigationAfterAddToCart(action: PayloadAction<Product>) {
  yield call(goBack);

  Toast.show({
    type: 'success',
    text1: STRINGS.cart.cart.addedTitle,
    text2: `${action.payload.title} ${STRINGS.cart.cart.addedMessage}`,
    position: 'bottom',
    visibilityTime: 2000,
  });
}

export function* watchCartSaga() {
  yield takeLatest(checkoutRequest.type, handleCheckout);
  yield takeEvery(addToCart.type, handleNavigationAfterAddToCart);
}
