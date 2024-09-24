import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SendEmailConfirmationModalContent from '../../../../../presentation/components/Modals/Contents/SendEmailConfirmationModalContent';
import { NativeBaseProvider } from 'native-base';
import createMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockRequestConfirmationModal = jest.fn();
const mockSendEmailConfirmationCode = jest.fn();

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
}));

jest.mock('i18n-js', () => ({
  t: jest.fn((key) => key),
}));

jest.mock('../../../../../business/store/actions/AppActions', () => {
  const requestConfirmationModal = jest.fn();

  return requestConfirmationModal;
});

jest.mock('../../../../../business/store/actions/AccountActions', () => {
  const sendEmailVerificationCodeAsync = jest.fn();

  return sendEmailVerificationCodeAsync;
});

const mockStore = createMockStore([]);

const renderComponent = () => {
  let store = mockStore({});

  return render(
    <NativeBaseProvider>
      <Provider store={store}>
        <SendEmailConfirmationModalContent
          requestConfirmationModal={mockRequestConfirmationModal}
          sendEmailConfirmationCode={mockSendEmailConfirmationCode}
        />
      </Provider>
    </NativeBaseProvider>,
  );
};

describe('SendEmailConfirmationModalContent', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("affiche le texte de confirmation d'email", () => {
    const { getByText } = renderComponent();
    expect(getByText('Aled::Modal:EmailConfirmation')).toBeTruthy();
  });

  it('appelle requestConfirmationModal avec null lorsque le bouton "Cancel" est pressé', () => {
    const { getByText } = renderComponent();

    fireEvent.press(getByText('AbpUi::Cancel'));
    expect(mockRequestConfirmationModal).toHaveBeenCalledWith({
      modalType: null,
    });
    expect(mockRequestConfirmationModal).toHaveBeenCalledTimes(1);
  });

  it('appelle sendEmailConfirmationCode et ferme le modal lorsque le bouton "Yes" est pressé', () => {
    const { getByText } = renderComponent();

    fireEvent.press(getByText('AbpUi::Yes'));
    expect(mockSendEmailConfirmationCode).toHaveBeenCalledTimes(1);
    expect(mockRequestConfirmationModal).toHaveBeenCalledWith({
      modalType: null,
    });
    expect(mockRequestConfirmationModal).toHaveBeenCalledTimes(1);
  });
});
