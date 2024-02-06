import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const testValue = 'testValue'
    expect(await resolveValue(testValue)).toBe(testValue)
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const testErrorMesage = 'testErrorMesage'
    expect(() => throwError(testErrorMesage)).toThrowError(testErrorMesage)
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError('Oops!')
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError)
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(() => rejectCustomError()).rejects.toThrowError(MyAwesomeError);
  });
});
