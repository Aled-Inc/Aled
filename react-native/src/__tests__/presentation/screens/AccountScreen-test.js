import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AccountScreen from '../../../presentation/screens/Account/AccountScreen';
import { NativeBaseProvider } from 'native-base';

const mockStore = configureStore([]);

const userMock = {
  userName: 'testuser',
  name: 'Test',
  surname: 'User',
  email: 'test@example.com',
  phoneNumber: '1234567890',
};

const navigateMock = jest.fn();
const updateUsernameMock = jest.fn();
const updateNameMock = jest.fn();
const updateSurnameMock = jest.fn();
const updateEmailMock = jest.fn();
const updatePhoneMock = jest.fn();
const changePasswordMock = jest.fn();
const disableProfileMock = jest.fn();
const deleteProfileMock = jest.fn();

jest.mock('../../../business/store/actions/AccountActions', () => ({
  disableProfile: jest.fn(),
  deleteProfileMock: jest.fn(),
}));

const setup = store => {
  return render(
    <NativeBaseProvider>
      <Provider store={store}>
        <AccountScreen
          navigation={{ navigate: navigateMock }}
          user={userMock}
          updateUsername={updateUsernameMock}
          updateName={updateNameMock}
          updateSurname={updateSurnameMock}
          updateEmail={updateEmailMock}
          updatePhone={updatePhoneMock}
          changePassword={changePasswordMock}
          disableProfile={disableProfileMock}
          deleteProfile={deleteProfileMock}
        />
      </Provider>
    </NativeBaseProvider>,
  );
};

jest.mock('i18n-js', () => ({
  t: jest.fn(key => key),
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
}));

describe('AccountScreen', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { user: userMock },
    });

    navigateMock.mockReset();
  });

  it('should render correctly', () => {
    const { getByText } = setup(store);
    expect(getByText('AbpIdentity::DisplayName:UserName')).toBeTruthy();
    expect(getByText('Test')).toBeTruthy();
  });

  it('should navigate on username edit', () => {
    const { getByText } = setup(store);
    fireEvent.press(getByText('AbpIdentity::DisplayName:UserName'));

    expect(navigateMock).toHaveBeenCalledWith(
      'Edit',
      expect.objectContaining({
        title: 'AbpIdentity::DisplayName:UserName',
        propName: 'AbpIdentity::DisplayName:UserName',
        propValue: 'testuser',
        propRole: 'common',
        submit: expect.any(Function),
      }),
    );
  });

  it('should navigate on name edit', () => {
    const { getByText } = setup(store);
    fireEvent.press(getByText('AbpIdentity::DisplayName:Name'));

    expect(navigateMock).toHaveBeenCalledWith(
      'Edit',
      expect.objectContaining({
        title: 'AbpIdentity::DisplayName:Name',
        propName: 'AbpIdentity::DisplayName:Name',
        propValue: 'Test',
        propRole: 'common',
        submit: expect.any(Function),
      }),
    );
  });

  it('should navigate on surname edit', () => {
    const { getByText } = setup(store);
    fireEvent.press(getByText('AbpIdentity::DisplayName:Surname'));

    expect(navigateMock).toHaveBeenCalledWith(
      'Edit',
      expect.objectContaining({
        title: 'AbpIdentity::DisplayName:Surname',
        propName: 'AbpIdentity::DisplayName:Surname',
        propValue: 'User',
        propRole: 'common',
        submit: expect.any(Function),
      }),
    );
  });

  it('should navigate on email edit', () => {
    const { getByText } = setup(store);
    fireEvent.press(getByText('AbpIdentity::DisplayName:Email'));

    expect(navigateMock).toHaveBeenCalledWith(
      'Edit',
      expect.objectContaining({
        title: 'AbpIdentity::DisplayName:Email',
        propName: 'AbpIdentity::DisplayName:Email',
        propValue: 'test@example.com',
        propRole: 'email',
        submit: expect.any(Function),
      }),
    );
  });

  it('should navigate on phone number edit', () => {
    const { getByText } = setup(store);
    fireEvent.press(getByText('Aled::PhoneNumber'));

    expect(navigateMock).toHaveBeenCalledWith(
      'Edit',
      expect.objectContaining({
        title: 'Aled::PhoneNumber',
        propName: 'Aled::PhoneNumber',
        propValue: '1234567890',
        propRole: 'phone',
        submit: expect.any(Function),
      }),
    );
  });

  it('should navigate on password change', () => {
    const { getByText } = setup(store);
    fireEvent.press(getByText('Aled::Password'));

    expect(navigateMock).toHaveBeenCalledWith('Edit', {
      title: 'AbpIdentity::DisplayName:NewPassword',
      propName: 'AbpIdentity::DisplayName:NewPassword',
      propValue: null,
      propRole: 'password',
      submit: expect.any(Function),
    });
  });

  it('should call disableProfile when Disable button is pressed', async () => {
    const { getByText } = setup(store);

    fireEvent.press(getByText('Aled::Settings:Account:Manage:Disable'));

    expect(disableProfileMock).toHaveBeenCalled();
  });

  it('should call deleteProfile when Delete button is pressed', () => {
    const { getByText } = setup(store);
    fireEvent.press(getByText('Aled::Settings:Account:Manage:Delete'));

    expect(deleteProfileMock).toHaveBeenCalled();
  });
});
