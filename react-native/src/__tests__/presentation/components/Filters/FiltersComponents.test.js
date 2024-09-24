import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FiltersComponent from '../../../../presentation/components/Filters/FiltersComponent';
import { Filters } from '../../../../common/utils/InventoryUtils';
import { NativeBaseProvider } from 'native-base';
import { Colors } from '../../../../presentation/styles/CommonStyle';

jest.mock('i18n-js', () => ({
  t: jest.fn(key => key),
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
}));

describe('FiltersComponent', () => {
  const mockGetActiveFilter = jest.fn();

  it('affiche et applique correctement les filtres', () => {
    const { getByText } = render(
      <NativeBaseProvider>
        <FiltersComponent getActiveFilter={mockGetActiveFilter} />
      </NativeBaseProvider>,
    );

    expect(getByText(`Aled::Inventory:Filters:${Filters.All}`)).toBeTruthy();
    expect(getByText(`Aled::Inventory:Filters:${Filters.Expired}`)).toBeTruthy();
    expect(getByText(`Aled::Inventory:Filters:${Filters.Latest}`)).toBeTruthy();
    expect(getByText(`Aled::Inventory:Filters:${Filters.ExpiredSoon}`)).toBeTruthy();

    fireEvent.press(getByText(`Aled::Inventory:Filters:${Filters.Expired}`));

    expect(mockGetActiveFilter).toHaveBeenCalledWith(Filters.Expired);
  });

  it('change correctement la couleur du filtre actif', () => {
    const { getByText, rerender } = render(
      <NativeBaseProvider>
        <FiltersComponent getActiveFilter={mockGetActiveFilter} />
      </NativeBaseProvider>,
    );

    const expiredFilter = getByText(`Aled::Inventory:Filters:${Filters.Expired}`);
    expect(expiredFilter.props.style[0].color).toEqual(Colors.Text);

    fireEvent.press(expiredFilter);

    rerender(
    <NativeBaseProvider>
      <FiltersComponent getActiveFilter={mockGetActiveFilter} />
    </NativeBaseProvider>);

    expect(expiredFilter.props.style[0].color).toEqual(Colors.Element);
  });
});
