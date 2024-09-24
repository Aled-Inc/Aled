import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import ProductSearch from '../../../../presentation/components/Search/SearchProduct';
import InventoryService from '../../../../business/services/InventoryService';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('../../../../business/services/InventoryService');
jest.mock('../../../../business/store/actions/LoadingActions', () => {
  const start = jest.fn();

  return start;
});

const mockStartLoading = jest.fn();
const mockStopLoading = jest.fn();

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
}));
jest.mock('i18n-js', () => ({
  t: jest.fn((key) => key),
}));

const mockProducts = [
  { id: '1', productName: 'Product A' },
  { id: '2', productName: 'Product B' },
  { id: '3', productName: 'Product C' },
];

const mockStore = createMockStore([]);

const renderComponent = () => {
  let store = mockStore({

  });

  return render(
    <NativeBaseProvider>
      <Provider store={store}>
        <NavigationContainer>
          <ProductSearch
            products={mockProducts}
            startLoading={mockStartLoading}
            stopLoading={mockStopLoading}
          />
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
    ,
  );
};

describe('ProductSearch', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('affiche le champ de recherche', () => {
    const { getByPlaceholderText } = renderComponent();
    expect(
      getByPlaceholderText('Aled::Inventory:Search:Placeholder'),
    ).toBeTruthy();
  });

  it('filtre les produits lorsque le texte de recherche change', () => {
    const { getByPlaceholderText, getByText } = renderComponent();

    fireEvent.changeText(
      getByPlaceholderText('Aled::Inventory:Search:Placeholder'),
      'Product A',
    );
    expect(getByText('Product A')).toBeTruthy();
    expect(() => getByText('Product B')).toThrow();
  });

  it('appelle startLoading et stopLoading lors de la recherche de produits', async () => {
    InventoryService.getInventoryProducts.mockResolvedValueOnce({
      data: { items: mockProducts },
    });

    const { getByPlaceholderText, getByText } = renderComponent();

    await act(async() => {
      fireEvent.changeText(
        getByPlaceholderText('Aled::Inventory:Search:Placeholder'),
        'Product',
      );

      await waitFor(() => {
        fireEvent.press(getByText('Aled::Inventory:Search'));
      });
    });

    expect(mockStartLoading).toHaveBeenCalledTimes(1);
    expect(mockStopLoading).toHaveBeenCalledTimes(1);
  });

  it('affiche les résultats de recherche lorsque des produits sont trouvés', async () => {
    InventoryService.getInventoryProducts.mockResolvedValueOnce({
      data: { items: mockProducts },
    });

    const { getByPlaceholderText, getByText } = renderComponent();

    fireEvent.changeText(
      getByPlaceholderText('Aled::Inventory:Search:Placeholder'),
      'Product',
    );
    fireEvent.press(getByText('Aled::Inventory:Search'));

    await waitFor(() => {
      expect(getByText('Product A')).toBeTruthy();
      expect(getByText('Product B')).toBeTruthy();
      expect(getByText('Product C')).toBeTruthy();
    });
  });
});
