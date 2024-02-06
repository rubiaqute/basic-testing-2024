import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 5, b: 3, action: Action.Subtract, expected: 2 },
    { a: 7, b: 0, action: Action.Subtract, expected: 7 },
    { a: 8, b: -1, action: Action.Subtract, expected: 9 },
    { a: 6, b: 3, action: Action.Multiply, expected: 18 },
    { a: 7, b: 0, action: Action.Multiply, expected: 0 },
    { a: 70, b: 10, action: Action.Divide, expected: 7 },
    { a: 8, b: 1, action: Action.Divide, expected: 8 },
    { a: 2, b: 8, action: Action.Exponentiate, expected: 256 },
    { a: 8, b: 1, action: Action.Exponentiate, expected: 8 },
    { a: 3, b: 9, action: "wie5u", expected: null },
    { a: '34', b: 1, action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {

  it.each(testCases)('return correct result for action - "$action" and arguments $a and $b', ({a, b, action, expected}) => {
    expect(simpleCalculator({
      a,b, action
    })).toBe(expected);
  });
});
