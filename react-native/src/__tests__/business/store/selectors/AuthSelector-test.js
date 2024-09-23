import { createUserSelector } from '../../../../business/store/selectors/AuthSelector';

describe('Selectors', () => {
  const mockState = {
    auth: {
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
    },
  };

  describe('createUserSelector', () => {
    it('should select the user from auth store', () => {
      const selector = createUserSelector();
      const result = selector(mockState);
      expect(result).toEqual(mockState.auth.user);
    });

    it('should return undefined if user does not exist', () => {
      const stateWithoutUser = {
        auth: {
          user: null,
        },
      };
      const selector = createUserSelector();
      const result = selector(stateWithoutUser);
      expect(result).toBeNull();
    });
  });
});
