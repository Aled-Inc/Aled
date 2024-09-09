import { createSelector } from "@reduxjs/toolkit";

const getInvetoryStore = state => state.inventory;

export function createProductSelector() {
  return createSelector([getInvetoryStore], inventory =>  inventory.inventory?.products)
}

export function createScanProductsSelector() {
  return createSelector([getInvetoryStore], inventory =>  inventory.scannedProducts)
}