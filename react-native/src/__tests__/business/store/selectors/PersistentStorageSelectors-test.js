import { 
  createTokenSelector, 
  createTenantSelector 
} from '../../../../business/store/selectors/PersistentStorageSelectors';

describe('Persistent Storage Selectors', () => {
  const mockState = {
    persistentStorage: {
      token: 'mockToken',
      tenant: { id: 1, name: 'Tenant1' },
    },
  };

  describe('createTokenSelector', () => {
    it('should select the token from persistentStorage', () => {
      const selector = createTokenSelector();
      const result = selector(mockState);
      expect(result).toBe(mockState.persistentStorage.token);
    });
  });

  describe('createTenantSelector', () => {
    it('should select the tenant from persistentStorage', () => {
      const selector = createTenantSelector();
      const result = selector(mockState);
      expect(result).toEqual(mockState.persistentStorage.tenant);
    });
  });
});
