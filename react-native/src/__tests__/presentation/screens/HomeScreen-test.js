import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from '../../../presentation/screens/Home/HomeScreen';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import * as Notifications from 'expo-notifications';

jest.mock('expo-notifications', () => ({
  getPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  scheduleNotificationAsync: jest.fn(),
  cancelNotificationAsync: jest.fn(),
  addNotificationReceivedListener: jest.fn(),
}));
jest.mock('i18n-js', () => ({
  t: jest.fn(key => key),
}));
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
}));
jest.mock(
  '../../../presentation/components/Caroussels/SimpleProductCaroussel',
  () => {
    const { Text } = require('react-native');
    return function MockedSimpleProductCarouselComponent() {
      return <Text>Mocked SimpleProductCarouselComponent</Text>;
    };
  },
);

jest.mock('../../../presentation/components/Search/SearchProduct', () => {
  const { Text } = require('react-native');
  return function MockedProductSearch() {
    return <Text>Mocked ProductSearch</Text>;
  };
});

const mockStore = createMockStore([]);

const setup = (user, inventory) => {
  const store = mockStore({
    auth: {
      user: user,
    },
    inventory: {
      inventory,
    },
  });

  return render(
    <NativeBaseProvider>
      <Provider store={store}>
        <HomeScreen user={user} inventory={inventory} />
      </Provider>
    </NativeBaseProvider>,
  );
};

describe('HomeScreen', () => {
  const user = { userName: 'Test User' };
  const inventory = { products: [] };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render user information correctly', async () => {
    const { getByText } = setup(user, inventory);

    expect(getByText('Test User')).toBeTruthy();
    expect(getByText('Aled::Home:Subtitle')).toBeTruthy();
  });

  it('should render the product search component', () => {
    const { getByText } = setup(user, inventory);

    expect(getByText('Aled::Home:TheyExpireSoon')).toBeTruthy();
    expect(getByText('Mocked ProductSearch')).toBeTruthy();
  });

  it('should render SimpleProductCarouselComponent', () => {
    const products = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];
    const { getByText } = setup(user, { products });

    expect(getByText('Mocked SimpleProductCarouselComponent')).toBeTruthy();
  });
});
