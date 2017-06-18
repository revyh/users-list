'use strict';

function mergeExtensions(original, added) {
  const result = Array.isArray(original)
    ? original.slice()
    : [];

  if (result[result.length - 1] !== '*')
    result.push('*');

  added.forEach(addedExt => {
    if (result.indexOf(addedExt) === -1)
      result.splice(result.length - 1, 0, addedExt);
  });

  return result;
}

module.exports = mergeExtensions;
