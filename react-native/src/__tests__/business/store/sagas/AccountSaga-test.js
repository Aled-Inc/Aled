import { select, call } from 'redux-saga/effects';
import AccountService from '../../../../business/services/AccountService';
import {
  updateUsername,
  updateName,
  updateSurname,
  updateEmail,
  updatePhone,
  changePassword,
  disableProfile,
  deleteProfile,
  sendEmailVerificationCode,
} from '../../../../business/store/sagas/AccountSaga';
import LoadingActions from '../../../../business/store/actions/LoadingActions';
import AuthActions from '../../../../business/store/actions/AuthActions';
import AppActions from '../../../../business/store/actions/AppActions';
import { getAuthStore } from '../../../../business/store/selectors/AuthSelector';
import { expectSaga } from 'redux-saga-test-plan';

describe('Account Sagas', () => {
  const mockAuthStore = {
    user: {
      extraProperties: {
        additionalProp1: 'string',
        additionalProp2: 'string',
        additionalProp3: 'string',
      },
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      creationTime: '2024-09-23T11:56:21.340Z',
      creatorId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      lastModificationTime: '2024-09-23T11:56:21.340Z',
      lastModifierId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      isDeleted: false,
      deleterId: null,
      deletionTime: null,
      tenantId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      userName: 'testUser',
      name: 'user',
      surname: 'userTest',
      email: 'user@test.com',
      emailConfirmed: false,
      phoneNumber: '0667430654',
      phoneNumberConfirmed: false,
      isActive: true,
      lockoutEnabled: false,
      accessFailedCount: 0,
      lockoutEnd: null,
      concurrencyStamp: '',
      entityVersion: 0,
      lastPasswordChangeTime: '2024-09-23T11:56:21.341Z',
      twoFactorEnabled: false,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('updateUsername', () => {
    it('should update the username successfully', () => {
      const userResponse = { id: 1, name: 'Jane Doe' };
  
      return expectSaga(updateUsername, { payload: { value: 'Jane Doe' } })
        .provide([
          [select(getAuthStore), mockAuthStore],
          [call(AccountService.updateUsername, 'Jane Doe', mockAuthStore.user), userResponse],
        ])
        .put(LoadingActions.pending())
        .put(AuthActions.setUser(userResponse))
        .put(LoadingActions.succeeded())
        .run();
    });
  
    it('should handle error when updating username', () => {
      const error = { response: { data: { error: { details: 'Error updating username' } } } };
  
      return expectSaga(updateUsername, { payload: { value: 'Jane Doe' } })
        .provide([
          [select(getAuthStore), mockAuthStore],
          [call(AccountService.updateUsername, 'Jane Doe', mockAuthStore.user), Promise.reject(error)],
        ])
        .put(LoadingActions.pending())
        .put(LoadingActions.failed(error.response.data.error.details))
        .run();
    });
  });

  describe('updateName', () => {
    it('should update the name successfully', () => {
      const userResponse = { id: 1, name: 'Jane Doe' };

      return expectSaga(updateName, { payload: { value: 'Jane Doe' } })
        .provide([
          [select(getAuthStore), mockAuthStore],
          [call(AccountService.updateName, 'Jane Doe', mockAuthStore.user), userResponse],
        ])
        .put(LoadingActions.pending())
        .put(AuthActions.setUser(userResponse))
        .put(LoadingActions.succeeded())
        .run();
    });

    it('should handle error when updating name', () => {
      const error = { response: { data: { error: { details: 'Error updating name' } } } };

      return expectSaga(updateName, { payload: { value: 'Jane Doe' } })
        .provide([
          [select(getAuthStore), mockAuthStore],
          [call(AccountService.updateName, 'Jane Doe', mockAuthStore.user), Promise.reject(error)],
        ])
        .put(LoadingActions.pending())
        .put(LoadingActions.failed(error.response.data.error.details))
        .run();
    });
  });

  describe('updateSurname', () => {
    it('should update the surname successfully', () => {
      const userResponse = { id: 1, surname: 'Smith' };

      return expectSaga(updateSurname, { payload: { value: 'Smith' } })
        .provide([
          [select(getAuthStore), mockAuthStore],
          [call(AccountService.updateSurname, 'Smith', mockAuthStore.user), userResponse],
        ])
        .put(LoadingActions.pending())
        .put(AuthActions.setUser(userResponse))
        .put(LoadingActions.succeeded())
        .run();
    });

    it('should handle error when updating surname', () => {
      const error = { response: { data: { error: { details: 'Error updating surname' } } } };

      return expectSaga(updateSurname, { payload: { value: 'Smith' } })
        .provide([
          [select(getAuthStore), mockAuthStore],
          [call(AccountService.updateSurname, 'Smith', mockAuthStore.user), Promise.reject(error)],
        ])
        .put(LoadingActions.pending())
        .put(LoadingActions.failed(error.response.data.error.details))
        .run();
    });
  });

  describe('updateEmail', () => {
    it('should update the email successfully', () => {
      const userResponse = { id: 1, email: 'jane.doe@example.com' };

      return expectSaga(updateEmail, { payload: { value: 'jane.doe@example.com' } })
        .provide([
          [select(getAuthStore), mockAuthStore],
          [call(AccountService.updateEmail, 'jane.doe@example.com', mockAuthStore.user), userResponse],
        ])
        .put(LoadingActions.pending())
        .put(AuthActions.setUser(userResponse))
        .put(LoadingActions.succeeded())
        .run();
    });

    it('should handle error when updating email', () => {
      const error = { response: { data: { error: { details: 'Error updating email' } } } };

      return expectSaga(updateEmail, { payload: { value: 'jane.doe@example.com' } })
        .provide([
          [select(getAuthStore), mockAuthStore],
          [call(AccountService.updateEmail, 'jane.doe@example.com', mockAuthStore.user), Promise.reject(error)],
        ])
        .put(LoadingActions.pending())
        .put(LoadingActions.failed(error.response.data.error.details))
        .run();
    });
  });

  describe('updatePhone', () => {
    it('should update the phone successfully', () => {
      const userResponse = { id: 1, phone: '1234567890' };

      return expectSaga(updatePhone, { payload: { value: '1234567890' } })
        .provide([
          [select(getAuthStore), mockAuthStore],
          [call(AccountService.updatePhone, '1234567890', mockAuthStore.user), userResponse],
        ])
        .put(LoadingActions.pending())
        .put(AuthActions.setUser(userResponse))
        .put(LoadingActions.succeeded())
        .run();
    });

    it('should handle error when updating phone', () => {
      const error = { response: { data: { error: { details: 'Error updating phone' } } } };

      return expectSaga(updatePhone, { payload: { value: '1234567890' } })
        .provide([
          [select(getAuthStore), mockAuthStore],
          [call(AccountService.updatePhone, '1234567890', mockAuthStore.user), Promise.reject(error)],
        ])
        .put(LoadingActions.pending())
        .put(LoadingActions.failed(error.response.data.error.details))
        .run();
    });
  });

  describe('changePassword', () => {
    it('should change the password successfully', () => {
      return expectSaga(changePassword, { payload: { value: 'newPassword', extraValue: 'oldPassword' } })
        .provide([
          [call(AccountService.changePassword, 'oldPassword', 'newPassword'), {}],
        ])
        .put(LoadingActions.pending())
        .put(LoadingActions.succeeded())
        .run();
    });

    it('should handle error when changing password', () => {
      const error = { response: { data: { error: { details: 'Error changing password' } } } };

      return expectSaga(changePassword, { payload: { value: 'newPassword', extraValue: 'oldPassword' } })
        .provide([
          [call(AccountService.changePassword, 'oldPassword', 'newPassword'), Promise.reject(error)],
        ])
        .put(LoadingActions.pending())
        .put(LoadingActions.failed(error.response.data.error.details))
        .run();
    });
  });

  describe('disableProfile', () => {
    it('should disable the profile successfully', () => {
      return expectSaga(disableProfile)
        .provide([
          [call(AccountService.disableProfile), {}],
        ])
        .put(LoadingActions.start({ key: 'disableProfile' }))
        .put(AppActions.logoutAsync({ showLoading: true }))
        .put(LoadingActions.stop({ key: 'disableProfile' }))
        .run();
    });
  });

  describe('deleteProfile', () => {
    it('should delete the profile successfully', () => {
      return expectSaga(deleteProfile)
        .provide([
          [call(AccountService.deleteProfile), {}],
        ])
        .put(LoadingActions.start({ key: 'deleteProfile' }))
        .put(AppActions.logoutAsync({ showLoading: true }))
        .put(LoadingActions.stop({ key: 'deleteProfile' }))
        .run();
    });
  });

  describe('sendEmailVerificationCode', () => {
    it('should send email verification code successfully', () => {
      return expectSaga(sendEmailVerificationCode)
        .provide([
          [call(AccountService.sendEmailVerificationCode), {}],
        ])
        .run();
    });
  });
});
