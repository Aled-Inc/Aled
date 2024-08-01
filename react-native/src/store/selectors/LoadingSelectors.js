import {createSelector} from 'reselect';

export const getLoading = state => state.loading;

export function createLoadingSelector() {
    return createSelector([getLoading], loading => loading.loading);
}

export function createOpacitySelector() {
    return createSelector([getLoading], loading => loading.opacity);
}

export function createActionLoadingSelector() {
  return createSelector([getLoading], loading => loading.actionLoading);
}

export function createActionStatusSelector() {
  return createSelector([getLoading], loading => loading.status);
}

export function createActionErrorSelector() {
  return createSelector([getLoading], loading => loading.actionError);
}