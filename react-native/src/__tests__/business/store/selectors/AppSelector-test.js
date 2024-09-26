import { createAppConfigSelector, createLanguageSelector, createLanguagesSelector, createGrantedPolicySelector, createRequestedConfirmationModalSelector } from '../../../../business/store/selectors/AppSelectors';

describe('Selectors', () => {
  const mockState = {
    app: {
      appConfig: {
        localization: {
          currentCulture: 'en-US',
          languages: ['en', 'fr'],
        },
        auth: {
          grantedPolicies: {
            read: true,
            write: false,
          },
        },
      },
      modalType: 'confirmation',
    },
  };

  describe('createAppConfigSelector', () => {
    it('should select appConfig from state', () => {
      const selector = createAppConfigSelector();
      const result = selector(mockState);
      expect(result).toEqual(mockState.app.appConfig);
    });
  });

  describe('createLanguageSelector', () => {
    it('should select currentCulture from appConfig', () => {
      const selector = createLanguageSelector();
      const result = selector(mockState);
      expect(result).toEqual(mockState.app.appConfig.localization.currentCulture);
    });
  });

  describe('createLanguagesSelector', () => {
    it('should select languages from appConfig', () => {
      const selector = createLanguagesSelector();
      const result = selector(mockState);
      expect(result).toEqual(mockState.app.appConfig.localization.languages);
    });
  });

  describe('createGrantedPolicySelector', () => {
    it('should select granted policy by key', () => {
      const selector = createGrantedPolicySelector('read');
      const result = selector(mockState);
      expect(result).toEqual(true); // 'read' policy is true
    });

    it('should return false for non-existing policy', () => {
      const selector = createGrantedPolicySelector('nonExistingPolicy');
      const result = selector(mockState);
      expect(result).toEqual(false); // Non-existing policy should return false
    });
  });

  describe('createRequestedConfirmationModalSelector', () => {
    it('should select modalType from state', () => {
      const selector = createRequestedConfirmationModalSelector();
      const result = selector(mockState);
      expect(result).toEqual(mockState.app.modalType);
    });
  });
});
