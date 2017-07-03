import binarySearch from './binarySearch';

function compare(val1, val2) {
  if (val1 === val2)
    return 0;

  return val1 > val2
    ? 1
    : -1;
}

it('should find exact match', () => {
  expect(binarySearch([1, 3, 5, 7, 9], 5, compare)).toBe(2);
});

it('should find index of closest less-than value', () => {
  expect(binarySearch([1, 3, 5, 7, 9], 6, compare)).toBe(2);
});

it('should return 0 if array contains single element', () => {
  expect(binarySearch([1], 6, compare)).toBe(0);
});
