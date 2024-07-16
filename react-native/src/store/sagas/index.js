import {all, fork} from 'redux-saga/effects';
import AppSaga from './AppSaga';
import AuthSaga from './AuthSaga';

export function* rootSaga() {
    yield all([ fork(AppSaga), fork(AuthSaga) ]);
}
