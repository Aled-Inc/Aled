import React from 'react';
import { render } from '@testing-library/react-native';
import ValidationMessage from '../../../../presentation/components/ValidationMessage/ValidationMessage';
import i18n from 'i18n-js';

jest.mock('i18n-js', () => ({
  t: jest.fn((key, values) => `${key} ${values[0]}`),
}));

describe('ValidationMessage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('affiche le message de validation avec la traduction correcte', () => {
    const messageKey = 'Aled::Validation:Error';

    const { getByText } = render(
      <ValidationMessage>{messageKey}</ValidationMessage>,
    );

    expect(i18n.t).toHaveBeenCalledWith(messageKey, { 0: 0 });

    const expectedText = `${messageKey} 0`;
    expect(getByText(expectedText)).toBeTruthy();
  });

  it("n'affiche rien si aucun enfant n'est fourni", () => {
    const { queryByText } = render(<ValidationMessage />);

    expect(queryByText(/./)).toBeNull();
  });
});
