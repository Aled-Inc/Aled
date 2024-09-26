import { 
  createLoadingSelector, 
  createOpacitySelector, 
  createActionLoadingSelector, 
  createActionStatusSelector, 
  createActionErrorSelector 
} from '../../../../business/store/selectors/LoadingSelectors';

describe('Loading Selectors', () => {
  const mockState = {
    loading: {
      loading: true,
      opacity: 0.5,
      actionLoading: false,
      status: 'idle',
      actionError: null,
    },
  };

  describe('createLoadingSelector', () => {
    it('should select loading state', () => {
      const selector = createLoadingSelector();
      const result = selector(mockState);
      expect(result).toBe(mockState.loading.loading);
    });
  });

  describe('createOpacitySelector', () => {
    it('should select opacity state', () => {
      const selector = createOpacitySelector();
      const result = selector(mockState);
      expect(result).toBe(mockState.loading.opacity);
    });
  });

  describe('createActionLoadingSelector', () => {
    it('should select actionLoading state', () => {
      const selector = createActionLoadingSelector();
      const result = selector(mockState);
      expect(result).toBe(mockState.loading.actionLoading);
    });
  });

  describe('createActionStatusSelector', () => {
    it('should select action status state', () => {
      const selector = createActionStatusSelector();
      const result = selector(mockState);
      expect(result).toBe(mockState.loading.status);
    });
  });

  describe('createActionErrorSelector', () => {
    it('should select action error state', () => {
      const selector = createActionErrorSelector();
      const result = selector(mockState);
      expect(result).toBe(mockState.loading.actionError);
    });

    it('should return null if actionError is not set', () => {
      const stateWithoutError = {
        loading: {
          loading: true,
          opacity: 0.5,
          actionLoading: false,
          status: 'idle',
          actionError: null,
        },
      };
      const selector = createActionErrorSelector();
      const result = selector(stateWithoutError);
      expect(result).toBeNull();
    });
  });
});
