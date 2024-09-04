import { createAction } from "@reduxjs/toolkit";

const addProductAsync = createAction('inventory/product/add', ({ barcode, expirationDate } = {}) => ({
  payload: {barcode, expirationDate }
}),
);

const addProductToInventory = createAction('inventory/add/product');

const addProductToScannedProducts = createAction('inventory/scan/add');
const clearScannedProducts = createAction('inventory/scan/clear');

export default {
  addProductAsync,
  addProductToInventory,
  addProductToScannedProducts,
  clearScannedProducts
};