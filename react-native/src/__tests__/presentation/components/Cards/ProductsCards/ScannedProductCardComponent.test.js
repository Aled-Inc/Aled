import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ScannedProductCardComponent from '../../../../../presentation/components/Cards/ProductCards/ScannedProductCardComponent';
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
  code: '789',
  productName: 'Produit Scanné',
  imageFrontUrl: 'https://example.com/product_image.jpg',
  expirationDate: '2024-12-31T00:00:00.000Z',
  quantity: 5,
  productCategoryTag: 'category-tag',
};

describe('ScannedProductCardComponent', () => {
  it('doit afficher les informations du produit correctement', () => {
    const { getByText, getByTestId } = render(
      <NativeBaseProvider>
        <ScannedProductCardComponent product={productMock} />
      </NativeBaseProvider>,
    );

    expect(getByText('Produit Scanné')).toBeTruthy();

    expect(getByText('Aled::Product:Quantity: 5')).toBeTruthy();

    expect(getByText('Aled::Product:DLC: 31/12/2024')).toBeTruthy();

    const image = getByTestId('product_image');
    expect(image.props.source.uri).toBe(
      'https://example.com/product_image.jpg',
    );
  });

  it('doit naviguer vers ProductDetails quand on appuie sur le produit', () => {
    const { getByText } = render(
      <NativeBaseProvider>
        <ScannedProductCardComponent product={productMock} />
      </NativeBaseProvider>,
    );

    fireEvent.press(getByText('Produit Scanné'));

    expect(mockNavigate).toHaveBeenCalledWith('ProductDetails', {
      code: '789',
    });
  });
});
