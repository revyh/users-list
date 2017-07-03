export default function binarySearch(array, val, compare) {
  let indBegin = 0;
  let indEnd = array.length - 1;

  while (indBegin + 1 < indEnd) {
    const indMid = Math.floor(indBegin + ((indEnd - indBegin) / 2));
    const compared = compare(val, array[indMid]);

    if (compared === 0)
      return indMid;

    if (compared > 0)
      indBegin = indMid;
    else
      indEnd = indMid;
  }

  return indBegin;
}
