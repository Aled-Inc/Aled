import { all, call, put, takeLatest } from 'redux-saga/effects';
import AuthService from '../../services/AuthService';
import AuthActions from '../actions/AuthActions';
import LoadingActions from '../actions/LoadingActions';
import PersistentStorageActions from '../actions/PersistentStorageActions';
import AppActions from '../actions/AppActions';
import InventoryActions from '../actions/InventoryActions';

function* login({ payload: { username, password, showLoading } }) {
  if (showLoading) {
    yield put(LoadingActions.start({ key: 'login', opacity: 0.7 }));
  }
  const data = yield call(AuthService.login, username, password);

  yield put(
    PersistentStorageActions.setToken({
      ...data,
      expire_time: new Date().valueOf() + data.expires_in,
      scope: 'Aled',
    }),
  );

  const user = yield call(AuthService.getCurrentUser);
  yield put(AuthActions.setUser(user));
  yield put(InventoryActions.getInventoryUser());

  yield put(AppActions.fetchAppConfigAsync());

  if (showLoading) {
    yield put(LoadingActions.stop({ key: 'login' }));
  }
}

function* register({ payload: { username, email, password, showLoading } }) {
  if (showLoading) {
    yield put(LoadingActions.start({ key: 'register', opacity: 0.7 }));
  }

  yield call(AuthService.register, username, email, password);

  if (showLoading) {
    yield put(LoadingActions.stop({ key: 'register' }));
  }

  yield put(AuthActions.loginAsync({ username, password, showLoading: true }));
}

function* reloadCurrentUserInfo() {
  yield put(LoadingActions.start({ key: 'reloadCurrentUserInfo', opacity: 1 }));

  const user = yield call(AuthService.getCurrentUser);
  yield put(AuthActions.setUser(user));

  yield put(LoadingActions.stop({ key: 'reloadCurrentUserInfo' }));
}

export default function* () {
  yield all([
    takeLatest(AuthActions.loginAsync.type, login),
    takeLatest(AuthActions.registerAsync.type, register),
    takeLatest(
      AuthActions.reloadCurrentUserInfoAsync.type,
      reloadCurrentUserInfo,
    ),
  ]);
}
