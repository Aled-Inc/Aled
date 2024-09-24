import React from 'react';
import { render, act, waitFor } from '@testing-library/react-native';
import ActionStatusModal from '../../../../presentation/components/Modals/ActionStatusModal';
import ActionStatus from '../../../../common/utils/ActionStatus';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import { NativeBaseProvider } from 'native-base';

jest.mock('../../../../business/store/actions/LoadingActions', () => {
  const idle = jest.fn();

  return idle;
});
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
}));
jest.mock('i18n-js', () => ({
  t: jest.fn((key) => key),
}));

const mockStore = createMockStore([]);

describe('ActionStatusModal Component', () => {
  const setIdleMock = jest.fn();

  const renderComponent = actionStatus => {
    let store = mockStore({
      loading: {
        status: actionStatus
      }
    });

    return render(
      <NativeBaseProvider>
        <Provider store={store}>
          <ActionStatusModal actionStatus={actionStatus} setIdle={setIdleMock} />
        </Provider>
      </NativeBaseProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("n'affiche rien lorsque l'actionStatus est 'idle'", () => {
    const { queryByTestId } = renderComponent(ActionStatus.idle);
    expect(queryByTestId('modal')).toBeNull();
  });

  it("n'affiche rien lorsque l'actionStatus est 'pending'", () => {
    const { queryByTestId } = renderComponent(ActionStatus.pending);
    expect(queryByTestId('modal')).toBeNull();
  });

  it("affiche le modal avec succès lorsque l'actionStatus est 'succeeded'", async() => {
    const { getByTestId, getByText } = renderComponent(ActionStatus.succeeded);
    expect(getByTestId('modal')).toBeTruthy();

    await waitFor(() => {
      expect(getByTestId('icon')).toBeTruthy();
    });

    expect(getByText('Aled::ErrorSave:Successful')).toBeTruthy();
  });

  it("affiche le modal avec une erreur lorsque l'actionStatus est 'failed'", async() => {
    const { getByTestId, getByText } = renderComponent(ActionStatus.failed);
    expect(getByTestId('modal')).toBeTruthy();

    await waitFor(() => {
      expect(getByTestId('icon')).toBeTruthy();
    });

    expect(getByText('Aled::ErrorSave:TryAgainOrLater')).toBeTruthy();
  });

  it("appelle setIdle après un délai lorsque l'action est réussie", () => {
    jest.useFakeTimers();
    renderComponent(ActionStatus.succeeded);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(setIdleMock).toHaveBeenCalled();
  });
});
