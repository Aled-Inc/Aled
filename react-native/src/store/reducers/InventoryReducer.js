import { createReducer } from '@reduxjs/toolkit';
import InventoryActions from '../actions/InventoryActions';

const initialState = { inventory: { products: [] }, scannedProducts: [] };

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
    .addCase(InventoryActions.setInventory, (state, action) => {
      state.inventory = action.payload;
    }),
);
