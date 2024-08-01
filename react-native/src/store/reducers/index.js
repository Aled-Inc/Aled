import {combineReducers} from '@reduxjs/toolkit';
import AppReducer from './AppReducer';
import LoadingReducer from './LoadingReducer';
import PersistentStorageReducer from './PersistentStorageReducer';
import AuthReducer from './AuthReducer';

const rootReducer = combineReducers({
    loading: LoadingReducer,
    app: AppReducer,
    persistentStorage: PersistentStorageReducer,
    auth: AuthReducer
});

export default rootReducer;
