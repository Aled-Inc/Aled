import {all, fork} from 'redux-saga/effects';
import AppSaga from './AppSaga';
import AuthSaga from './AuthSaga';
import AccountSaga from './AccountSaga';
import LoadingSaga from './LoadingSaga';

export function* rootSaga() {
    yield all([ 
      fork(AppSaga),
      fork(AuthSaga),
      fork(AccountSaga),
      fork(LoadingSaga)
    ]);
}
