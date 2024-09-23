import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AccountScreen from '../AccountScreen';
import AccountActions from '../../../business/store/actions/AccountActions';

const mockStore = configureStore([]);

const userMock = {
  userName: 'testuser',
  name: 'Test',
  surname: 'User',
  email: 'test@example.com',
  phoneNumber: '1234567890',
};

const setup = (store) => {
  return render(
    <Provider store={store}>
      <AccountScreen
        navigation={{ navigate: jest.fn() }}
        user={userMock}
        updateUsername={jest.fn()}
        updateName={jest.fn()}
        updateSurname={jest.fn()}
        updateEmail={jest.fn()}
        updatePhone={jest.fn()}
        changePassword={jest.fn()}
        disableProfile={jest.fn()}
        deleteProfile={jest.fn()}
      />
    </Provider>
  );
};

describe('AccountScreen', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { user: userMock },
    });
  });

  it('should render correctly', () => {
    const { getByText } = setup(store);
    expect(getByText('AbpIdentity::DisplayName:UserName')).toBeTruthy();
    expect(getByText('Test')).toBeTruthy();
  });

  it('should navigate on username edit', () => {
    const { getByText } = setup(store);
    fireEvent.press(getByText('AbpIdentity::DisplayName:UserName'));
    expect(store.dispatch).toHaveBeenCalledWith(AccountActions.updateUsernameAsync());
  });

  it('should call updateName when name is pressed', () => {
    const { getByText } = setup(store);
    fireEvent.press(getByText('AbpIdentity::DisplayName:Name'));
    expect(store.dispatch).toHaveBeenCalledWith(AccountActions.updateNameAsync());
  });

  it('should call disableProfile when Disable button is pressed', () => {
    const { getByText } = setup(store);
    fireEvent.press(getByText('Aled::Settings:Account:Manage:Disable'));
    expect(store.dispatch).toHaveBeenCalledWith(AccountActions.disableProfileAsync());
  });

  it('should call deleteProfile when Delete button is pressed', () => {
    const { getByText } = setup(store);
    fireEvent.press(getByText('Aled::Settings:Account:Manage:Delete'));
    expect(store.dispatch).toHaveBeenCalledWith(AccountActions.deleteProfileAsync());
  });
});
