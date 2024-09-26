import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import InventoryService from '../../../../business/services/InventoryService';
import InventoryActions from '../.././../../business/store/actions/InventoryActions';
import LoadingActions from '../.././../../business/store/actions/LoadingActions';
import { addProduct, clearScannedProducts, getInventoryUser } from '../../../../business/store/sagas/InventorySaga';

describe('Inventory Saga', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('addProduct saga', () => {
    it('should handle adding a product', () => {
      const payload = { barcode: '123456789' };
      const response = { data: { id: 1, code: '123456789' } };
      const inventoryDetails = { data: { unknownProductsCount : 1, cupboardProductsCount: 2, fridgeProductsCount: 3, freezerProductsCount: 4, totalProductsCount: 5 } };

      jest.spyOn(InventoryService, 'addProduct').mockReturnValue(response);
      jest.spyOn(InventoryService, 'getInventoryDetails').mockReturnValue(inventoryDetails);

      return expectSaga(addProduct, { payload })
        .provide([
          [call(InventoryService.addProduct, { code: payload.barcode, expirationDate: payload.expirationDate }), response],
        ])
        .put(LoadingActions.start({ key: 'addProduct', opacity: 0.4 }))
        .put(InventoryActions.addProductToInventory(response.data))
        .put(InventoryActions.addProductToScannedProducts(response.data))
        .put(InventoryActions.setInventoryDetails(inventoryDetails.data))
        .put(LoadingActions.stop({ key: 'addProduct' }))
        .run();
    });
  });

  describe('clearScannedProducts saga', () => {
    it('should clear scanned products if there are any', () => {
      jest.spyOn(require('../.././../../business/store/selectors/InventorySelector'), 'createScanProductsSelector').mockReturnValue([{}]);

      return expectSaga(clearScannedProducts)
        .put(InventoryActions.clearScannedProducts())
        .run();
    });

    it('should not clear scanned products if there are none', () => {
      jest.spyOn(require('../.././../../business/store/selectors/InventorySelector'), 'createScanProductsSelector').mockReturnValue([]);

      return expectSaga(clearScannedProducts)
        .not.put(InventoryActions.clearScannedProducts())
        .run();
    });
  });

  describe('getInventoryUser saga', () => {
    it('should handle getting inventory details and products', () => {
      const filter = {};
      const sorting = {};
      const skipCount = 0;
      const maxResultCount = 10;
      const inventoryDetailsResponse = { data: [{ id: 1, name: 'Product 1' }] };
      const inventoryProductsResponse = { data: [{ id: 1, code: '123456789' }] };

      return expectSaga(getInventoryUser, { payload: { filter, sorting, skipCount, maxResultCount } })
        .provide([
          [call(InventoryService.getInventoryDetails), inventoryDetailsResponse],
          [call(InventoryService.getInventoryProducts, filter, sorting, skipCount, maxResultCount), inventoryProductsResponse],
        ])
        .put(InventoryActions.setInventoryDetails(inventoryDetailsResponse.data))
        .put(LoadingActions.start({ key: 'getProducts', opacity: 0.4 }))
        .put(InventoryActions.setInventoryProducts(inventoryProductsResponse.data))
        .put(LoadingActions.stop({ key: 'getProducts' }))
        .run();
    });
  });
});
