import { createSelector } from "@reduxjs/toolkit";

export const getAuthStore = state => state.auth;

export function createUserSelector() {
  return createSelector([getAuthStore], auth => auth.user)
}