import { 
  isString, 
  firstLetterUpper, 
  toPascalCase, 
  hexToRGB, 
  toDate 
} from '../../../common/utils/CommonUtils';

describe('Utility Functions', () => {
  
  describe('isString', () => {
    it('should return true for a string', () => {
      expect(isString('test')).toBe(true);
    });
    
    it('should return false for a number', () => {
      expect(isString(123)).toBe(false);
    });
    
    it('should return false for null', () => {
      expect(isString(null)).toBe(false);
    });
    
    it('should return false for an object', () => {
      expect(isString({})).toBe(false);
    });
  });

  describe('firstLetterUpper', () => {
    it('should capitalize the first letter', () => {
      expect(firstLetterUpper('hello')).toBe('Hello');
    });
    
    it('should handle an empty string', () => {
      expect(firstLetterUpper('')).toBe('');
    });

    it('should convert the rest of the letters to lowercase', () => {
      expect(firstLetterUpper('hELLo')).toBe('Hello');
    });
  });

  describe('toPascalCase', () => {
    it('should convert string to PascalCase', () => {
      expect(toPascalCase('hello world')).toBe('HelloWorld');
    });

    it('should handle dashes and underscores', () => {
      expect(toPascalCase('hello-world')).toBe('HelloWorld');
      expect(toPascalCase('hello_world')).toBe('HelloWorld');
    });

    it('should handle mixed cases', () => {
      expect(toPascalCase('hELLo wOrLd')).toBe('HelloWorld');
    });
  });

  describe('hexToRGB', () => {
    it('should convert hex to rgb', () => {
      expect(hexToRGB('#ff5733')).toBe('rgb(255, 87, 51)');
    });

    it('should convert hex to rgba with alpha', () => {
      expect(hexToRGB('#ff5733', 0.5)).toBe('rgba(255, 87, 51, 0.5)');
    });

    it('should handle invalid hex codes gracefully', () => {
      expect(hexToRGB('#zzzzzz')).toBe('rgb(NaN, NaN, NaN)');
    });
  });

  describe('toDate', () => {
    it('should convert a valid date string to a Date object', () => {
      expect(toDate('2023-09-23')).toEqual(new Date('2023-09-23'));
    });

    it('should handle invalid date strings', () => {
      jest.spyOn(global.Date.prototype, 'valueOf').mockImplementation(() => '2024-09-23');
      expect(toDate('invalid date')).toEqual(Date.now());
      jest.restoreAllMocks();
    });
  });
});
