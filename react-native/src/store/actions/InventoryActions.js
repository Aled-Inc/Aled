import { createAction } from '@reduxjs/toolkit';

const addProductAsync = createAction(
  'inventory/product/add',
  ({ barcode, expirationDate } = {}) => ({
    payload: { barcode, expirationDate },
  }),
);

const addProductToInventory = createAction('inventory/add/product');

const addProductToScannedProducts = createAction('inventory/scan/add');
const clearScannedProducts = createAction('inventory/scan/clear');

const getInventoryUser = createAction('inventory/get', ({ filter, sorting, skipCount, maxResultCount } = {}) => ({
  payload: { filter, sorting, skipCount, maxResultCount }
}));

const setInventoryProducts = createAction('inventory/set/products');

const setInventoryDetails = createAction('inventory/set/details');
const setInventoryTotalProductsCount = createAction('inventory/set/products/count');

export default {
  addProductAsync,
  addProductToInventory,
  addProductToScannedProducts,
  clearScannedProducts,
  getInventoryUser,
  setInventoryDetails,
  setInventoryProducts,
  setInventoryTotalProductsCount
};
