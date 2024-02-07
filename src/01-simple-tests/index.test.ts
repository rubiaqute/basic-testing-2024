import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(
      simpleCalculator({
        a: 3,
        b: 7,
        action: Action.Add,
      }),
    ).toBe(10);
  });

  test('should subtract two numbers', () => {
    expect(
      simpleCalculator({
        a: 8,
        b: 3,
        action: Action.Subtract,
      }),
    ).toBe(5);
  });

  test('should multiply two numbers', () => {
    expect(
      simpleCalculator({
        a: 3,
        b: 5,
        action: Action.Multiply,
      }),
    ).toBe(15);
  });

  test('should divide two numbers', () => {
    expect(
      simpleCalculator({
        a: 24,
        b: 6,
        action: Action.Divide,
      }),
    ).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({
        a: 3,
        b: 3,
        action: Action.Exponentiate,
      }),
    ).toBe(27);
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({
        a: 3,
        b: 3,
        action: '67676',
      }),
    ).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({
        a: '3',
        b: undefined,
        action: Action.Add,
      }),
    ).toBeNull();
  });
});
