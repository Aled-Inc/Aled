import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import InventoryScreen from '../../../presentation/screens/Inventory/InventoryScreen';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import InventoryService from '../../../business/services/InventoryService';
import { ProductTag } from '../../../common/utils/ProductCategoryTagUtils';

jest.mock('i18n-js', () => ({
  t: jest.fn((key) => key),
}));

jest.mock('../../../presentation/components/Caroussels/SimpleProductCaroussel', () => {
  const { Text } = require('react-native');
  return () => <Text>Mocked SimpleProductCarouselComponent</Text>;
});

jest.mock('../../../presentation/components/Search/SearchProduct', () => {
  const { Text } = require('react-native');
  return () => <Text>Mocked ProductSearch</Text>;
});

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: jest.fn(() => ({ top: 0, left: 0, right: 0, bottom: 0 })),
}));

jest.mock('../../../business/services/InventoryService', () => ({
  getInventoryProducts: jest.fn().mockResolvedValue({ data: { items: [] } }),
}));

jest.mock('../../../business/store/actions/LoadingActions', () => {
  const start = jest.fn();
  return start;
});

const mockStore = createMockStore([]);

const productsByTag = {
  [ProductTag.Unknown]: [
    { id: 1, name: 'Produit Inconnu 1', expirationDate: '2024-12-01' },
    { id: 2, name: 'Produit Inconnu 2', expirationDate: '2024-12-15' },
  ],
  [ProductTag.Cupboard]: [
    { id: 3, name: 'Pâtes', expirationDate: '2025-05-01' },
    { id: 4, name: 'Conserves de tomates', expirationDate: '2024-10-30' },
    { id: 5, name: 'Riz', expirationDate: '2025-07-20' },
  ],
  [ProductTag.Fridge]: [
    { id: 6, name: 'Lait', expirationDate: '2024-09-28' },
    { id: 7, name: 'Yaourt', expirationDate: '2024-10-05' },
    { id: 8, name: 'Fromage', expirationDate: '2024-11-15' },
  ],
  [ProductTag.Freezer]: [
    { id: 9, name: 'Viande hachée', expirationDate: '2025-01-10' },
    { id: 10, name: 'Fruits surgelés', expirationDate: '2025-06-01' },
    { id: 11, name: 'Légumes surgelés', expirationDate: '2025-05-15' },
  ],
};

const setup = (inventory, startLoading = jest.fn(), stopLoading = jest.fn()) => {
  const store = mockStore({ inventory: { inventory } });
  return render(
    <NativeBaseProvider>
      <Provider store={store}>
        <InventoryScreen inventory={inventory} startLoading={startLoading} stopLoading={stopLoading} />
      </Provider>
    </NativeBaseProvider>
  );
};

describe('InventoryScreen', () => {
  let setProductListMock;

  beforeEach(() => {
    setProductListMock = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation(initial => [initial, setProductListMock]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const createMockInventory = (productCounts) => ({
    inventory: { products: [] },
    details: productCounts,
  });

  it('should render correctly and display product search', () => {
    const inventory = createMockInventory({
      unknownProductCount: 1,
      cupboardProductCount: 2,
      fridgeProductCount: 3,
      freezerProductCount: 4,
    });

    const { getByText, getAllByText } = setup(inventory);
    
    expect(getByText('Aled::Inventory:MyProducts')).toBeTruthy();
    expect(getByText('Mocked ProductSearch')).toBeTruthy();
    expect(getByText('1')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
    expect(getByText('4')).toBeTruthy();
    expect(getAllByText('Mocked SimpleProductCarouselComponent').length).toBe(2);
  });

  it('should toggle filters correctly', async () => {
    const inventory = createMockInventory({
      unknownProductCount: 1,
      cupboardProductCount: 2,
      fridgeProductCount: 3,
      freezerProductCount: 4,
    });

    const { getByText, getAllByText } = setup(inventory);
    
    await act(async () => {
      fireEvent.press(getByText('Cupboard'));
    });

    expect(getAllByText('Mocked SimpleProductCarouselComponent').length).toBe(2);
  });

  it('should call startLoading and stopLoading during product fetch', async () => {
    const startLoadingMock = jest.fn();
    const stopLoadingMock = jest.fn();
    const inventory = createMockInventory({
      unknownProductCount: 1,
      cupboardProductCount: 2,
      fridgeProductCount: 3,
      freezerProductCount: 4,
    });

    const { getByText } = setup(inventory, startLoadingMock, stopLoadingMock);
    
    await act(async () => {
      fireEvent.press(getByText('Cupboard'));
    });

    expect(startLoadingMock).toHaveBeenCalled();
    expect(stopLoadingMock).toHaveBeenCalled();
  });
});
