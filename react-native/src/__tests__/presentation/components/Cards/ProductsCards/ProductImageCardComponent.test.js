import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductImageCardComponent from '../../../../../presentation/components/Cards/ProductCards/ProductImageCardComponent';
import { NativeBaseProvider } from 'native-base';

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
  code: '456',
  productName: 'Produit Test',
  imageFrontUrl: 'https://example.com/product_image.jpg',
  expirationDate: '2024-10-12T00:00:00.000Z',
  quantity: 3,
  productCategoryTag: 'test-tag',
};

describe('ProductImageCardComponent', () => {
  it("doit afficher l'image du produit", () => {
    const { getByTestId } = render(
      <NativeBaseProvider>
        <ProductImageCardComponent product={productMock} />
      </NativeBaseProvider>,
    );

    // Vérifier que l'image du produit est affichée correctement
    const productImage = getByTestId('product_img');
    expect(productImage.props.source.uri).toBe(
      'https://example.com/product_image.jpg',
    );
  });

  it("doit naviguer vers ProductDetails quand on appuie sur l'image", () => {
    const { getByTestId } = render(
      <NativeBaseProvider>
        <ProductImageCardComponent product={productMock} />
      </NativeBaseProvider>,
    );

    // Simuler un appui sur l'image
    fireEvent.press(getByTestId('product_img'));

    // Vérifier que la navigation est déclenchée avec le bon paramètre
    expect(mockNavigate).toHaveBeenCalledWith('ProductDetails', {
      code: '456',
    });
  });
});
