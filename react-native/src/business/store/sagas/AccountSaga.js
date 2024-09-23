import { all, call, put, select, takeLatest } from "redux-saga/effects";
import AccountService from "../../services/AccountService";
import AppActions from "../actions/AppActions";
import AccountActions from "../actions/AccountActions";
import LoadingActions from "../actions/LoadingActions";
import { getAuthStore } from '../selectors/AuthSelector';
import AuthActions from "../actions/AuthActions";

export function* updateUsername({ payload : { value }}) {
  try {
    yield put(LoadingActions.pending());
  
    const authStore = yield select(getAuthStore);
    const user = yield call(AccountService.updateUsername, value, authStore.user);
  
    yield put(AuthActions.setUser(user));  
    yield put(LoadingActions.succeeded());
  } catch (error) {
    const details = error.response.data.error.details;
    yield put(LoadingActions.failed(details));
  }
}

export function* updateName({ payload : { value }}) {
  try {
    yield put(LoadingActions.pending());
  
    const authStore = yield select(getAuthStore);
    const user = yield call(AccountService.updateName, value, authStore.user);
  
    yield put(AuthActions.setUser(user));
    yield put(LoadingActions.succeeded());
  } catch (error) {
    const details = error.response.data.error.details;
    yield put(LoadingActions.failed(details));
  }
}

export function* updateSurname({ payload : { value }}) {
  try {
    yield put(LoadingActions.pending());
  
    const authStore = yield select(getAuthStore);
    const user = yield call(AccountService.updateSurname, value, authStore.user);
  
    yield put(AuthActions.setUser(user));
    yield put(LoadingActions.succeeded());
  } catch (error) {
    const details = error.response.data.error.details;
    yield put(LoadingActions.failed(details));
  }
}

export function* updateEmail({ payload : { value }}) {
  try {
    yield put(LoadingActions.pending());
  
    const authStore = yield select(getAuthStore);
    const user = yield call(AccountService.updateEmail, value, authStore.user);
  
    yield put(AuthActions.setUser(user));
    yield put(LoadingActions.succeeded());
  } catch (error) {
    const details = error.response.data.error.details;
    yield put(LoadingActions.failed(details));
  }
}

export function* updatePhone({ payload : { value }}) {
  try {
    yield put(LoadingActions.pending());
  
    const authStore = yield select(getAuthStore);
    const user = yield call(AccountService.updatePhone, value, authStore.user);
  
    yield put(AuthActions.setUser(user));
    yield put(LoadingActions.succeeded());
  } catch (error) {
    const details = error.response.data.error.details;
    yield put(LoadingActions.failed(details));
  }
}

export function* changePassword({payload: {value, extraValue }}) {
  try {
    yield put(LoadingActions.pending());

    yield call(AccountService.changePassword, extraValue, value);
  
    yield put(LoadingActions.succeeded());
  } catch (error) {
    const details = error.response.data.error.details;
    yield put(LoadingActions.failed(details));
  }
}

export function* disableProfile() {
  yield put(LoadingActions.start({ key: 'disableProfile' }));

  yield call(AccountService.disableProfile);
  yield put(AppActions.logoutAsync({ showLoading: true }));

  yield put(LoadingActions.stop({ key: 'disableProfile' }));
}

export function* deleteProfile() {
  yield put(LoadingActions.start({ key: 'deleteProfile' }));

  yield call(AccountService.deleteProfile);
  yield put(AppActions.logoutAsync({ showLoading: true }));

  yield put(LoadingActions.stop({ key: 'deleteProfile' }));
}

export function* sendEmailVerificationCode() {
  yield call(AccountService.sendEmailVerificationCode);
}

export default function* () {
  yield all([
    takeLatest(AccountActions.updateUsernameAsync.type, updateUsername),
    takeLatest(AccountActions.updateNameAsync.type, updateName),
    takeLatest(AccountActions.updateSurnameAsync.type, updateSurname),
    takeLatest(AccountActions.updateEmailAsync.type, updateEmail),
    takeLatest(AccountActions.updatePhoneAsync.type, updatePhone),
    takeLatest(AccountActions.changePasswordAsync.type, changePassword),
    takeLatest(AccountActions.disableProfileAsync.type, disableProfile),
    takeLatest(AccountActions.deleteProfileAsync.type, deleteProfile),
    takeLatest(AccountActions.sendEmailVerificationCodeAsync.type, sendEmailVerificationCode),
  ]);
}