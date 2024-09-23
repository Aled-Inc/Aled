import {createSelector} from 'reselect';

export const getPersistentStorage = state => state.persistentStorage;

export function createTokenSelector() {
    return createSelector([getPersistentStorage], persistentStorage => persistentStorage.token);
}

export function createTenantSelector() {
    return createSelector([getPersistentStorage], persistentStorage => persistentStorage.tenant);
}
