import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EmailConfirmationScreen from '../../../presentation/screens/EmailConfirmation/EmailConfirmationScreen';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import ActionStatus from '../../../common/utils/ActionStatus';

jest.mock('i18n-js', () => ({
  t: jest.fn((key) => key),
}));
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
}));
jest.mock('../../../business/store/actions/AuthActions', () => {
  const reloadCurrentUserInfoAsync = jest.fn();

  return reloadCurrentUserInfoAsync;
});

const mockStore = createMockStore([]);
const mockReloadCurrentUserInfo = jest.fn();
const mockNavigation = jest.fn();

const setup = (state) => {
  const store = mockStore({});
  return render(
    <NativeBaseProvider>
      <Provider store={store}>
        <EmailConfirmationScreen route={{ params: { state } }} navigation={{ navigate: mockNavigation }} reloadCurrentUserInfo={mockReloadCurrentUserInfo} />
      </Provider>
    </NativeBaseProvider>
  );
};

describe('EmailConfirmationScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully when email confirmation succeeds', () => {
    const { getByText } = setup(ActionStatus.succeeded);

    expect(getByText('Aled::EmailConfirmation:Succeeded')).toBeTruthy();
    expect(getByText('Aled::EmailConfirmation:SucceededDescription')).toBeTruthy();
  });

  it('should render failed message when email confirmation fails', () => {
    const { getByText } = setup(ActionStatus.failed);

    expect(getByText('Aled::EmailConfirmation:Failed')).toBeTruthy();
    expect(getByText('Aled::EmailConfirmation:FailedDescription')).toBeTruthy();
  });

  it('should call reloadCurrentUserInfo on mount', () => {
    setup(ActionStatus.succeeded);

    expect(mockReloadCurrentUserInfo).toHaveBeenCalled();
  });

  it('should navigate to Home on button press', () => {
    const { getByText } = setup(ActionStatus.succeeded);

    const button = getByText('Aled::SeeMyFridge');
    fireEvent.press(button);

    expect(mockNavigation).toHaveBeenCalledWith('Home');
  });
});
