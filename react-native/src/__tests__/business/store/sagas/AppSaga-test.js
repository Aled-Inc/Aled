import { call, select } from 'redux-saga/effects';
import {
  fetchAppConfig,
  setLanguage,
  logout,
  requestConfirmationModal,
} from '../../../../business/store/sagas/AppSaga';
import AppActions from '../../../../business/store/actions/AppActions';
import LoadingActions from '../../../../business/store/actions/LoadingActions';
import PersistentStorageActions from '../../../../business/store/actions/PersistentStorageActions';
import { getPersistentStorage } from '../../../../business/store/selectors/PersistentStorageSelectors';
import { getApp } from '../../../../business/store/selectors/AppSelectors';
import { getApplicationConfiguration } from '../../../../api/ApplicationConfigurationAPI';
import AuthService from '../../../../business/services/AuthService';
import { expectSaga } from 'redux-saga-test-plan';

describe('App Sagas', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchAppConfig', () => {
    it('should fetch app config successfully', () => {
      const appConfigResponse = { localization: { currentCulture: { cultureName: 'en-US' } } };

      return expectSaga(fetchAppConfig, { payload: { showLoading: true, callback: jest.fn() } })
        .provide([
          [call(getApplicationConfiguration), appConfigResponse],
        ])
        .put(LoadingActions.start({ key: 'appConfig', opacity: 1 }))
        .put(AppActions.setAppConfig(appConfigResponse))
        .put(PersistentStorageActions.setLanguage(appConfigResponse.localization.currentCulture.cultureName))
        .put(LoadingActions.stop({ key: 'appConfig' }))
        .run();
    });

    it('should handle app config fetch without loading', () => {
      const appConfigResponse = { localization: { currentCulture: { cultureName: 'en-US' } } };

      return expectSaga(fetchAppConfig, { payload: { showLoading: false, callback: jest.fn() } })
        .provide([
          [call(getApplicationConfiguration), appConfigResponse],
        ])
        .put(AppActions.setAppConfig(appConfigResponse))
        .run();
    });
  });

  describe('setLanguage', () => {
    it('should set language and fetch app config', () => {
      const language = 'fr-FR';
  
      return expectSaga(setLanguage, { payload: language })
        .put(PersistentStorageActions.setLanguage(language))
        .run();
    });
  });
  
  describe('logout', () => {
    it('should logout successfully with loading', () => {
      const persistentStorage = { token: { access_token: 'access', refresh_token: 'refresh' } };

      return expectSaga(logout, { payload: { showLoading: true } })
        .provide([
          [select(getPersistentStorage), persistentStorage],
          [call(AuthService.logout, { client_id: 'clientId', token: 'access' }), {}],
          [call(AuthService.logout, { client_id: 'clientId', token: 'refresh', token_type_hint: 'refresh_token' }), {}],
        ])
        .put(LoadingActions.start({ key: 'logout', opacity: 0.7 }))
        .put(PersistentStorageActions.setToken({}))
        .put(LoadingActions.stop({ key: 'logout' }))
        .run();
    });

    it('should logout successfully without loading', () => {
      const persistentStorage = { token: { access_token: 'access' } };

      return expectSaga(logout, { payload: { showLoading: false } })
        .provide([
          [select(getPersistentStorage), persistentStorage],
          [call(AuthService.logout, { client_id: 'clientId', token: 'access' }), {}],
        ])
        .put(PersistentStorageActions.setToken({}))
        .run();
    });
  });

  describe('requestConfirmationModal', () => {
    it('should request confirmation modal if modalType is different', () => {
      const modalType = 'confirmAction';
      const app = { modalType: 'differentAction' };

      return expectSaga(requestConfirmationModal, { payload: { modalType } })
        .provide([
          [select(getApp), app],
        ])
        .put(AppActions.requestConfirmationModal({ modalType }))
        .run();
    });

    it('should not request confirmation modal if modalType is the same', () => {
      const modalType = 'confirmAction';
      const app = { modalType };

      return expectSaga(requestConfirmationModal, { payload: { modalType } })
        .provide([
          [select(getApp), app],
        ])
        .not.put(AppActions.requestConfirmationModal({ modalType }))
        .run();
    });
  });
});
