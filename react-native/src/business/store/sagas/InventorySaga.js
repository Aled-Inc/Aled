import { all, call, put, takeLatest } from 'redux-saga/effects';
import InventoryService from '../../services/InventoryService';
import InventoryActions from '../actions/InventoryActions';
import { createScanProductsSelector } from '../selectors/InventorySelector';
import LoadingActions from '../actions/LoadingActions';

export function* addProduct({ payload: { barcode } }) {
  yield put(LoadingActions.start({ key: 'addProduct', opacity: 0.4 }));

  const response = yield call(InventoryService.addProduct, {
    code: barcode
  });
  
  yield put(InventoryActions.addProductToInventory(response.data));
  yield put(InventoryActions.addProductToScannedProducts(response.data));

  yield put(LoadingActions.stop({ key: 'addProduct' }));
}

export function* clearScannedProducts() {
  if (createScanProductsSelector().length !== 0) {
    yield put(InventoryActions.clearScannedProducts());
  }
}

export function* getInventoryUser({ payload: { filter, sorting, skipCount, maxResultCount} }) {
  const inventoryDetailsResponse = yield call(InventoryService.getInventoryDetails);
  yield put(InventoryActions.setInventoryDetails(inventoryDetailsResponse.data));

  yield put(LoadingActions.start({ key: 'getProducts', opacity: 0.4 }));

  const inventoryProductsResponse = yield call(InventoryService.getInventoryProducts, filter, sorting, skipCount, maxResultCount);
  yield put(InventoryActions.setInventoryProducts(inventoryProductsResponse.data));
  
  yield put(LoadingActions.stop({ key: 'getProducts' }));

}


export default function* () {
  yield all([
    takeLatest(InventoryActions.addProductAsync.type, addProduct),
    takeLatest(
      InventoryActions.clearScannedProducts.type,
      clearScannedProducts,
    ),
    takeLatest(InventoryActions.getInventoryUser.type, getInventoryUser),
  ]);
}
