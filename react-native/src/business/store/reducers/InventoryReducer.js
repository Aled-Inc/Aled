import { createReducer } from '@reduxjs/toolkit';
import InventoryActions from '../actions/InventoryActions';

const initialState = { inventory: { products: [], details: {}, totalProducts: 0 }, scannedProducts: [] };

export default createReducer(initialState, builder =>
  builder
    .addCase(InventoryActions.addProductToInventory, (state, action) => {
      state.inventory.products = [action.payload, ...state.inventory.products];
    })
    .addCase(InventoryActions.addProductToScannedProducts, (state, action) => {
      state.scannedProducts = [action.payload, ...state.scannedProducts];
    })
    .addCase(InventoryActions.clearScannedProducts, state => {
      state.scannedProducts = [];
    })
    .addCase(InventoryActions.setInventoryDetails, (state, action) => {
      state.inventory.details = action.payload;
    })
    .addCase(InventoryActions.setInventoryProducts, (state, action) => {
      state.inventory.products = action.payload.items;
      state.inventory.totalProducts = action.payload.totalCount;
    }),
);
