import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import AuthService from '../../../../business/services/AuthService';
import AuthActions from '../../../../business/store/actions/AuthActions';
import LoadingActions from '../../../../business/store/actions/LoadingActions';
import PersistentStorageActions from '../../../../business/store/actions/PersistentStorageActions';
import InventoryActions from '../../../../business/store/actions/InventoryActions';
import { login, register, reloadCurrentUserInfo } from '../../../../business/store/sagas/AuthSaga';

const mockedUser = { name: 'John Doe' };
const tokenData = { expires_in: 3600, expire_time: 1727100960799, scope: 'Aled' };

describe('Auth saga', () => {
  let mockDateValue;

  beforeEach(() => {
    mockDateValue = tokenData.expire_time;
    jest.spyOn(global.Date.prototype, 'valueOf').mockImplementation(() => mockDateValue);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('login saga', () => {
    it('should handle login with loading', () => {
      const payload = { username: 'test', password: 'password', showLoading: true };
      
      return expectSaga(login, { payload })
        .provide([
          [call(AuthService.login, payload.username, payload.password), tokenData],
          [call(AuthService.getCurrentUser), mockedUser],
        ])
        .put(LoadingActions.start({ key: 'login', opacity: 0.7 }))
        .put(PersistentStorageActions.setToken({ 
          ...tokenData, 
          expire_time: mockDateValue + tokenData.expires_in 
        }))
        .put(AuthActions.setUser(mockedUser))
        .put(InventoryActions.getInventoryUser())
        .put(LoadingActions.stop({ key: 'login' }))
        .run();
    });
    
    it('should handle login without loading', () => {
      const payload = { username: 'test', password: 'password', showLoading: false };
    
      return expectSaga(login, { payload })
      .provide([
        [call(AuthService.login, payload.username, payload.password), tokenData],
        [call(AuthService.getCurrentUser), mockedUser],
      ])
      .put(PersistentStorageActions.setToken({ 
        ...tokenData, 
        expire_time: mockDateValue + tokenData.expires_in 
      }))
      .put(AuthActions.setUser(mockedUser))
      .put(InventoryActions.getInventoryUser())
      .run();
    });
  });

  describe('register saga', () => {
    it('should handle register with loading', () => {
      const payload = { username: 'test', email: 'test@test.com', password: 'password', showLoading: true };

      return expectSaga(register, { payload })
        .provide([
          [call(AuthService.register, payload.username, payload.email, payload.password), null],
        ])
        .put(LoadingActions.start({ key: 'register', opacity: 0.7 }))
        .put(AuthActions.loginAsync({ username: payload.username, password: payload.password, showLoading: true }))
        .put(LoadingActions.stop({ key: 'register' }))
        .run();
    });

    it('should handle register without loading', () => {
      const payload = { username: 'test', email: 'test@test.com', password: 'password', showLoading: false };
      
      return expectSaga(register, { payload })
        .provide([
          [call(AuthService.register, payload.username, payload.email, payload.password), null],
        ])
        .put(AuthActions.loginAsync({ username: payload.username, password: payload.password, showLoading: true }))
        .run();
    });
  });

  describe('reloadCurrentUserInfo saga', () => {
    it('should reload user info', () => {
      return expectSaga(reloadCurrentUserInfo)
        .provide([
          [call(AuthService.getCurrentUser), mockedUser],
        ])
        .put(LoadingActions.start({ key: 'reloadCurrentUserInfo', opacity: 1 }))
        .put(AuthActions.setUser(mockedUser))
        .put(LoadingActions.stop({ key: 'reloadCurrentUserInfo' }))
        .run();
    });
  });
});
