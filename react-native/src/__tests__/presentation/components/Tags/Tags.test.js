import React from 'react';
import { render } from '@testing-library/react-native';
import Tag from '../../../../presentation/components/Tags/Tag';
import { ProductCategoryTagInfo, ProductTag } from '../../../../common/utils/ProductCategoryTagUtils';
import { NativeBaseProvider } from 'native-base';

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
}));

describe('Tag', () => {
  it('affiche le tag avec le texte et le style appropriés', () => {
    const { getByText, getByTestId } = render(
      <NativeBaseProvider>
        <Tag productCategoryTag={ProductCategoryTagInfo[ProductTag.Unknown]} />
      </NativeBaseProvider>
    );

    const tagText = getByText(ProductCategoryTagInfo[ProductTag.Unknown].label);
    expect(tagText).toBeTruthy();

    const tagBox = getByTestId('tag-box');
    expect(tagBox).toBeTruthy();

    expect(tagBox.props.style[0].backgroundColor).toBe(ProductCategoryTagInfo[ProductTag.Unknown].backgroundColor);
    expect(tagText.props.style[0].color).toBe(ProductCategoryTagInfo[ProductTag.Unknown].labelColor);
  });

  it("affiche Unknown par defaut", () => {
    const { queryByText } = render(
      <NativeBaseProvider>
        <Tag productCategoryTag={ProductCategoryTagInfo[-1]} />
      </NativeBaseProvider>
    );

    expect(queryByText(ProductCategoryTagInfo[ProductTag.Unknown].label)).toBeTruthy();
  });
});
