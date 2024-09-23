import { toLocalISOString } from '../../../common/utils/DateExtensions';

describe('toLocalISOString', () => {
  it('should convert a date to local ISO string', () => {
    const date = new Date('2023-09-23T12:00:00Z'); // UTC time
    const localISOString = toLocalISOString(date);
    expect(localISOString).toBe(new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString());
  });

  it('should handle dates in different time zones', () => {
    const date = new Date('2023-09-23T12:00:00-0500'); // UTC-5
    const localISOString = toLocalISOString(date);
    expect(localISOString).toBe(new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString());
  });

  it('should handle invalid date inputs gracefully', () => {
    expect(() => toLocalISOString(null)).toThrow(TypeError);
    expect(() => toLocalISOString(undefined)).toThrow(TypeError);
    expect(() => toLocalISOString('invalid date')).toThrow(TypeError);
  });
});
