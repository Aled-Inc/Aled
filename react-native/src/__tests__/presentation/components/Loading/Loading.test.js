import React from 'react';
import { render } from '@testing-library/react-native';
import Loading from '../../../../presentation/components/Loading/Loading';
import { NativeBaseProvider } from 'native-base';
import createMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
}));

const mockStore = createMockStore([]);

const renderLoadingComponent = (loading = false, opacity = 0.6) => {
  const store = mockStore({
    loading: {
      loading,
      opacity,
    }
  });

  return render(
    <NativeBaseProvider>
      <Provider store={store}>
        <Loading />
      </Provider>
    </NativeBaseProvider>
  );
};

describe('Loading Component', () => {
  it("n'affiche rien lorsque loading est false", () => {
    const { queryByTestId } = renderLoadingComponent(false);
    expect(queryByTestId('spinner')).toBeNull();
  });

  it('affiche un Spinner lorsque loading est true', () => {
    const { getByTestId } = renderLoadingComponent(true);
    expect(getByTestId('spinner')).toBeTruthy();
  });

  it("applique correctement l'opacité du backdrop", () => {
    const customOpacity = 0.8;
    const { getByTestId } = renderLoadingComponent(true, customOpacity);
    
    const backdrop = getByTestId('backdrop');
    expect(backdrop.props.style[1].opacity).toBe(customOpacity);
  });

  it("utilise l'opacité par défaut lorsque opacity n'est pas défini", () => {
    const { getByTestId } = renderLoadingComponent(true);
    
    const backdrop = getByTestId('backdrop');
    expect(backdrop.props.style[1].opacity).toBe(0.6);
  });
});
