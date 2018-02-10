import { last } from '../utils';

describe('utils', () => {
  test('return last value.', () => {
    const array = [1, 2, 3];
    expect(last(array)).toBe(3);
  });
});
