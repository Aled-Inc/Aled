import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ConfSecuScreen from '../../../presentation/screens/Conf&Security/ConfSecuScreen';
import createMockStore from 'redux-mock-store';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';

jest.mock('i18n-js', () => ({
  t: jest.fn((key) => key),
}));
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
}));
jest.mock('../../../presentation/screens/Settings/SettingsSectionLayout', () => {
  const { View, Text } = require('react-native');
  return ({ children, title }) => <View><Text>{title}</Text>{children}</View>;
});
jest.mock('../../../presentation/screens/Settings/SettingsButtonRow', () => {
  const { TouchableOpacity, Text } = require('react-native');
  return {
    Check: ({ onPress, label }) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{label}</Text>
      </TouchableOpacity>
    ),
  };
});
jest.mock('../../../business/store/actions/AppActions', () => {
  const requestConfirmationModal = jest.fn();

  return requestConfirmationModal;
});

const mockStore = createMockStore([]);
const mockRequestConfirmationModal = jest.fn();

const setup = (store) => {
  return render(
    <NativeBaseProvider>
      <Provider store={store}>
        <ConfSecuScreen requestConfirmationModal={mockRequestConfirmationModal} />
      </Provider>
    </NativeBaseProvider>
  );
};

describe('ConfSecuScreen', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: {
          emailConfirmed: false,
          phoneNumberConfirmed: false,
          twoFactorEnabled: false,
        },
      }
    });

    mockRequestConfirmationModal.mockClear();
  });

  it('should render correctly', () => {
    const { getByText } = setup(store);
    
    // Vérifie si les titres des sections sont bien affichés
    expect(getByText('Aled::Settings:ConfidentialityAndSecurity:VerifiedInformation')).toBeTruthy();
    expect(getByText('Aled::Settings:ConfidentialityAndSecurity:Security')).toBeTruthy();
  });

  it('should not call requestConfirmationModal if email is confirmed', () => {
    store = mockStore({
      auth: {
        user: {
          emailConfirmed: true,
          phoneNumberConfirmed: false,
          twoFactorEnabled: false,
        },
      }
    });

    const { getByText } = setup(store);

    const emailButton = getByText('AbpIdentity::DisplayName:Email');
    fireEvent.press(emailButton);

    // Ne devrait pas appeler la modal car l'email est confirmé
    expect(mockRequestConfirmationModal).not.toHaveBeenCalled();
  });

  it('should call requestConfirmationModal if email is not confirmed', () => {
    const { getByText } = setup(store);

    const emailButton = getByText('AbpIdentity::DisplayName:Email');
    fireEvent.press(emailButton);

    // Devrait appeler la modal pour confirmer l'email
    expect(mockRequestConfirmationModal).toHaveBeenCalledWith({
        modalType: 'EmailConfirmationModal',
    });
  });

  it('should not trigger action on phone number press', () => {
    const { getByText } = setup(store);

    const phoneButton = getByText('Aled::PhoneNumber');
    fireEvent.press(phoneButton);

    // Pas d'action à déclencher pour le numéro de téléphone
    expect(mockRequestConfirmationModal).not.toHaveBeenCalled();
  });

  it('should not trigger any action on two-factor authentication press', () => {
    const { getByText } = setup(store);

    const twoFactorButton = getByText('AbpIdentity::DisplayName:TwoFactorEnabled');
    fireEvent.press(twoFactorButton);

    // Pas d'action configurée pour le bouton de double authentification
    expect(mockRequestConfirmationModal).not.toHaveBeenCalled();
  });
});
