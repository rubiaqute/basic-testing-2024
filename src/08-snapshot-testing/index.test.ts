import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const testValues = [1, 2, 3, 4, 5];
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(testValues)).toStrictEqual({
      next: {
        next: {
          next: {
            next: { next: { next: null, value: null }, value: 5 },
            value: 4,
          },
          value: 3,
        },
        value: 2,
      },
      value: 1,
    });
  });

  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(testValues)).toMatchSnapshot();
  });
});
