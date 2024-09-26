import { isUserValid, haveValidCommonName } from '../../../common/utils/UserUtils';
import { isString } from '../../../common/utils/CommonUtils';

jest.mock('../../../common/utils/CommonUtils');

describe('User validation utils', () => {
  describe('isUserValid', () => {
    it('should return false for null user', () => {
      expect(isUserValid(null)).toBe(false);
    });

    it('should return false for non-object user', () => {
      expect(isUserValid("string")).toBe(false);
      expect(isUserValid(123)).toBe(false);
    });

    it('should return true for valid user object', () => {
      expect(isUserValid({})).toBe(true);
    });
  });

  describe('haveValidCommonName', () => {
    it('should return false if user.name is not a valid string', () => {
      isString.mockReturnValue(false);
      const user = { name: 123, surname: 'Doe' };
      expect(haveValidCommonName(user)).toBe(false);
    });

    it('should return false if user.surname is not a valid string', () => {
      isString.mockReturnValueOnce(true).mockReturnValueOnce(false);
      const user = { name: 'John', surname: 123 };
      expect(haveValidCommonName(user)).toBe(false);
    });

    it('should return true for valid name and surname', () => {
      isString.mockReturnValue(true);
      const user = { name: 'John', surname: 'Doe' };
      expect(haveValidCommonName(user)).toBe(true);
    });
  });
});
