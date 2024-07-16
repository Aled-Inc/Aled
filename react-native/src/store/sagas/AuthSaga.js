import {all, call, put, takeLatest} from 'redux-saga/effects';
import AuthService from "../../services/AuthService";
import AuthActions from "../actions/AuthActions";
import LoadingActions from "../actions/LoadingActions";
import PersistentStorageActions from "../actions/PersistentStorageActions";
import AppActions from '../actions/AppActions';

function* login({payload: {username, password, showLoading}}) {
  if (showLoading) {
    yield put(LoadingActions.start({ key: 'login', opacity: 0.7 }));
  }
  const data = yield call(AuthService.login, username, password);

  yield put(PersistentStorageActions.setToken({ ...data, expire_time: new Date().valueOf() + data.expires_in, scope: "Aled"}));
  
  const user = yield call(AuthService.getCurrentUser);
  yield put(AuthActions.setUser(user));

  yield put(AppActions.fetchAppConfigAsync({ showLoading: false }));

  if (showLoading) {
    yield put(LoadingActions.stop({ key: 'login' }));
  }
}

function* register({payload: {username, email, password, showLoading}}) {
  if (showLoading) {
    yield put(LoadingActions.start({ key: 'register', opacity: 0.7 }));
  }

  yield call(AuthService.register, username, email, password);
  yield put(AuthActions.loginAsync({ username, password, showLoading: true}));

  if (showLoading) {
    yield put(LoadingActions.stop({ key: 'register' }));
  }
}

export default function* () {
  yield all([
    takeLatest(AuthActions.loginAsync.type, login),
    takeLatest(AuthActions.registerAsync.type, register),
  ]);
}