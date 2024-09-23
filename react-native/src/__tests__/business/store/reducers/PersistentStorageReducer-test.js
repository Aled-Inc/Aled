import reducer from '../../../../business/store/reducers/PersistentStorageReducer';
import PersistentStorageActions from '../../../../business/store/actions/PersistentStorageActions';

describe('PersistentStorage Reducer', () => {
  const initialState = {
    token: {},
    language: null,
    tenant: {},
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle setToken action', () => {
    const tokenData = { accessToken: 'token123' };
    const action = PersistentStorageActions.setToken(tokenData);
    const expectedState = {
      ...initialState,
      token: tokenData,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setLanguage action', () => {
    const language = 'fr';
    const action = PersistentStorageActions.setLanguage(language);
    const expectedState = {
      ...initialState,
      language,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setTenant action', () => {
    const tenantData = { id: 1, name: 'Tenant1' };
    const action = PersistentStorageActions.setTenant(tenantData);
    const expectedState = {
      ...initialState,
      tenant: tenantData,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
