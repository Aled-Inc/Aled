import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { getApplicationConfiguration } from '../../../api/ApplicationConfigurationAPI';
import AppActions from '../actions/AppActions';
import LoadingActions from '../actions/LoadingActions';
import PersistentStorageActions from '../actions/PersistentStorageActions';
import { getEnvVars } from '../../../../Environment';
import AuthService from '../../services/AuthService';
import { getPersistentStorage } from '../selectors/PersistentStorageSelectors';
import { getApp } from '../selectors/AppSelectors';

const env = getEnvVars();

function* fetchAppConfig({ payload: { showLoading, callback } }) {
  if (showLoading) {
    yield put(LoadingActions.start({ key: 'appConfig', opacity: 1 }));
  }

  const data = yield call(getApplicationConfiguration);
  yield put(AppActions.setAppConfig(data));
  yield put(
    PersistentStorageActions.setLanguage(
      data.localization.currentCulture.cultureName,
    ),
  );
  if (showLoading) yield put(LoadingActions.stop({ key: 'appConfig' }));
  callback();
}

function* setLanguage(action) {
  yield put(PersistentStorageActions.setLanguage(action.payload));
  yield put(AppActions.fetchAppConfigAsync());
}

function* logout({ payload: { showLoading } }) {
  if (showLoading) {
    yield put(LoadingActions.start({ key: 'logout', opacity: 0.7 }));
  }
  const persistentStorage = yield select(getPersistentStorage);

  const { clientId } = env.oAuthConfig;
  const { access_token, refresh_token } = persistentStorage.token;

  const data = { client_id: clientId, token: access_token };

  yield call(AuthService.logout, data);

  if (!!refresh_token) {
    data.token = refresh_token;
    data.token_type_hint = 'refresh_token';
    yield call(AuthService.logout, data);
  }

  yield put(PersistentStorageActions.setToken({}));
  yield put(AppActions.fetchAppConfigAsync());
  if (showLoading) yield put(LoadingActions.stop({ key: 'logout' }));
}

function* requestConfirmationModal({ payload: { modalType } }) {
  let app = yield select(getApp);

  if (app.modalType != modalType) {
    yield put(AppActions.requestConfirmationModal({ modalType: modalType }));
  }
}

export default function* () {
  yield all([
    takeLatest(AppActions.setLanguageAsync.type, setLanguage),
    takeLatest(AppActions.fetchAppConfigAsync.type, fetchAppConfig),
    takeLatest(AppActions.logoutAsync.type, logout),
    takeLatest(
      AppActions.requestConfirmationModal.type,
      requestConfirmationModal,
    ),
  ]);
}
