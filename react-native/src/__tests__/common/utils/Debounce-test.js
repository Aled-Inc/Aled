import { debounce } from '../../../common/utils/Debounce';

describe('debounce', () => {
  jest.useFakeTimers();

  it('should debounce a function call', () => {
    const callback = jest.fn();
    const debouncedFunction = debounce(callback, 100);

    debouncedFunction();
    debouncedFunction();
    debouncedFunction();

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should call the function immediately if immediate is true', () => {
    const callback = jest.fn();
    const debouncedFunction = debounce(callback, 100, true);

    debouncedFunction();

    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should reset the timer if called again', () => {
    const callback = jest.fn();
    const debouncedFunction = debounce(callback, 100);

    debouncedFunction();
    jest.advanceTimersByTime(50);
    debouncedFunction();

    jest.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
