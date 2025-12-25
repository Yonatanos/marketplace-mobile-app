import { all } from 'redux-saga/effects';
import { watchProductsSaga } from '../features/products/store/productsSaga';
import { watchCartSaga } from '../features/cart/store/cartSaga';

export function* rootSaga() {
  yield all([watchProductsSaga(), watchCartSaga()]);
}
