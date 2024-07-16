import { createSelector } from "@reduxjs/toolkit";

const getAuthStore = state => state.auth;

export function createUserSelector() {
  return createSelector([getAuthStore], auth => auth.user)
}