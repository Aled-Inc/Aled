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

const getInventoryUser = createAction('inventory/get');

const setInventory = createAction('inventory/set');

export default {
  addProductAsync,
  addProductToInventory,
  addProductToScannedProducts,
  clearScannedProducts,
  getInventoryUser,
  setInventory,
};
