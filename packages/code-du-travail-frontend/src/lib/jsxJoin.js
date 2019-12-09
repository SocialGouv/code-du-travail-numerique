import React from "react";
/**
 *
 * @param {Array} array an array containing jsx node
 * @param {Object} separator string or jsx
 */
export function jsxJoin(array, separator = ", ") {
  return array.reduce((state, item) => {
    return !state ? (
      item
    ) : (
      <>
        {state}
        {separator}
        {item}
      </>
    );
  }, null);
}
