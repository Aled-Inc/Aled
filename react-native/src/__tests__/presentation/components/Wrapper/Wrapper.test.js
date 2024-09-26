import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Keyboard } from 'react-native';
import Wrapper from '../../../../presentation/components/Wrapper/Wrapper';
import { Button, NativeBaseProvider, Text, View } from 'native-base';

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
}));

describe('Wrapper', () => {
  afterEach(() => {
    jest.restoreAllMocks(); // Restaure tous les mocks après chaque test
  });

  it('doit rendre ses enfants correctement', () => {
    const { getByText } = render(
      <NativeBaseProvider>
        <Wrapper>
          <Text>Test Child</Text>
        </Wrapper>
      </NativeBaseProvider>
    );

    expect(getByText('Test Child')).toBeTruthy();
  });

  it("doit appeler Keyboard.dismiss lors d'un appui", () => {
    jest.spyOn(Keyboard, 'dismiss').mockImplementation(() => {});
    const { getByRole } = render(
      <NativeBaseProvider>
        <Wrapper>
          <View>
            <Text>Test Child</Text>
            <Button>Button</Button>
          </View>
        </Wrapper>
      </NativeBaseProvider>
    );

    const touchable = getByRole('button');

    fireEvent.press(touchable);

    expect(Keyboard.dismiss).toHaveBeenCalled();
  });
});
