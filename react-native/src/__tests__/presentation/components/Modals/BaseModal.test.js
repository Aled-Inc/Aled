import React from 'react';
import { render } from '@testing-library/react-native';
import BaseModal from '../../../../presentation/components/Modals/BaseModal';
import ModalTypes from '../../../../common/utils/ModalTypes';
import { NativeBaseProvider } from 'native-base';
import createMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
}));
jest.mock('i18n-js', () => ({
  t: jest.fn((key) => key),
}));

const mockStore = createMockStore([]);

describe('BaseModal Component', () => {
  const renderComponent = modalType => {
    let store = mockStore({
      app: {
        modalType: modalType
      }
    });

    return render(
      <NativeBaseProvider>
        <Provider store={store}>
          <BaseModal modalType={modalType} />
        </Provider>
      </NativeBaseProvider>
    );
  };

  it("n'affiche rien lorsque le modalType n'est pas une chaîne", () => {
    const { queryByTestId } = renderComponent(null);
    expect(queryByTestId('base-modal')).toBeNull();
  });

  it("n'affiche rien lorsque le modalType est une chaîne vide", () => {
    const { queryByTestId } = renderComponent('');
    expect(queryByTestId('base-modal')).toBeNull();
  });

  it("affiche le contenu 'SendEmailConfirmationModalContent' lorsque le modalType est 'EmailConfirmationModal'", async() => {
    const { getByTestId } = renderComponent(ModalTypes.EmailConfirmationModal);

    expect(getByTestId('base-modal')).toBeTruthy();
    expect(getByTestId('email-confirmation-content')).toBeTruthy();
  });

  it('affiche un contenu vide pour un modalType inconnu', () => {
    const { queryByTestId } = renderComponent('UnknownModalType');
    expect(queryByTestId('email-confirmation-content')).toBeNull();
  });
});
