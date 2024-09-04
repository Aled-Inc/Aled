import {all, call, put, takeLatest} from 'redux-saga/effects';
import InventoryService from '../../services/InventoryService';
import InventoryActions from '../actions/InventoryActions';
import { createScanProductsSelector } from '../selectors/InventorySelector';
import LoadingActions from '../actions/LoadingActions';

function* addProduct({payload: { barcode, expirationDate }}) {
  yield put(LoadingActions.start({ key: 'addProduct', opacity: 0.4 }));
  
  const response = yield call(InventoryService.addProduct, { code: barcode, expirationDate });
  yield put(InventoryActions.addProductToInventory(response.data));
  yield put(InventoryActions.addProductToScannedProducts(response.data));
  
  yield put(LoadingActions.stop({ key: 'addProduct' }));
}

function* clearScannedProducts() {
  if (createScanProductsSelector().length !== 0) {
    yield put(InventoryActions.clearScannedProducts());
  }
}

export default function* () {
  yield all([
    takeLatest(InventoryActions.addProductAsync.type, addProduct),
    takeLatest(InventoryActions.clearScannedProducts.type, clearScannedProducts),
  ]);
}