import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductCardComponent from '../../../../../presentation/components/Cards/ProductCards/ProductCardComponent';
import { NativeBaseProvider } from 'native-base';

jest.mock('i18n-js', () => ({
  t: jest.fn(key => key),
}));
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: jest.fn(() => ({ top: 0, left: 0, right: 0, bottom: 0 })),
}));

const productMock = {
  code: '123',
  productName: 'Produit Test',
  imageFrontUrl: 'https://example.com/image.jpg',
  expirationDate: '2024-10-12T00:00:00.000Z',
  quantity: 3,
  productCategoryTag: 'test-tag',
};

describe('ProductCardComponent', () => {
  it('doit afficher les informations du produit correctement', () => {
    const { getByText } = render(
      <NativeBaseProvider>
        <ProductCardComponent product={productMock} />
      </NativeBaseProvider>,
    );

    expect(getByText('Produit Test')).toBeTruthy();

    expect(getByText('Aled::Product:Quantity: 3')).toBeTruthy();

    expect(getByText('Aled::Product:DLC: 12/10/2024')).toBeTruthy();
  });

  it('doit naviguer vers ProductDetails quand on appuie sur le produit', () => {
    const { getByText } = render(
      <NativeBaseProvider>
        <ProductCardComponent product={productMock} />
      </NativeBaseProvider>,
    );

    fireEvent.press(getByText('Produit Test'));

    expect(mockNavigate).toHaveBeenCalledWith('ProductDetails', {
      code: '123',
    });
  });
});
