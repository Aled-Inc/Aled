import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SimpleProductCarouselComponent from '../../../../presentation/components/Caroussels/SimpleProductCaroussel';
import ProductCardComponent from '../../../../presentation/components/Cards/ProductCards/ProductCardComponent';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { Filters } from '../../../../common/utils/InventoryUtils';

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: jest.fn(() => ({ top: 0, left: 0, right: 0, bottom: 0 })),
}));

jest.mock('../../../../../assets/icons/empty_box.svg', () => () => null);

jest.mock('i18n-js', () => ({
  t: jest.fn(key => key),
}));

const mockProducts = [
  {
    code: '001',
    productName: 'Produit 1',
    expirationDate: '2024-12-31T00:00:00.000Z',
    addedDate: '2024-01-01T00:00:00.000Z',
    quantity: 5,
    productCategoryTag: 'category1',
  },
  {
    code: '002',
    productName: 'Produit 2',
    expirationDate: '2022-12-31T00:00:00.000Z',
    addedDate: '2023-01-01T00:00:00.000Z',
    quantity: 3,
    productCategoryTag: 'category2',
  },
];

const mockOnPageChanged = jest.fn();

const setup = (products, component) => {
  return render(
    <NativeBaseProvider>
      <NavigationContainer>
        <SimpleProductCarouselComponent products={products} CardComponent={component}/>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

describe('SimpleProductCarouselComponent', () => {
  it('affiche le message "Pas de produits" lorsque la liste est vide', () => {
    const { getByText } = setup([]);

    expect(
      getByText('Aled::Component:SimpleProductCarousel:NoProduct'),
    ).toBeTruthy();
  });

  it("affiche la liste des produits quand elle n'est pas vide", () => {
    const { getByText } = setup(mockProducts, ProductCardComponent);

    expect(getByText('Produit 1')).toBeTruthy();
    expect(getByText('Produit 2')).toBeTruthy();
  });

  it('applique correctement le filtre des produits expirés', () => {
    const { getByText, queryByText } = setup(mockProducts, ProductCardComponent);

    fireEvent.press(getByText(`Aled::Inventory:Filters:${Filters.Expired}`));

    expect(getByText('Produit 2')).toBeTruthy();
    expect(queryByText('Produit 1')).toBeNull();
  });

  it('affiche correctement la pagination et change de page', async () => {
    const { getByText } = render(
      <NativeBaseProvider>
        <NavigationContainer>
          <SimpleProductCarouselComponent
            products={mockProducts}
            showPagination={true}
            defaultItemsNumber={1}
            onPageChanged={mockOnPageChanged}
          />
        </NavigationContainer>
      </NativeBaseProvider>,
    );
  
    fireEvent.press(getByText('AbpUi::PagerNext'));
  
    await waitFor(() => {
      expect(mockOnPageChanged).toHaveBeenCalledWith(1);
      expect(getByText('2')).toBeTruthy();
    });
  });
});
