export function removeUndefinedValues(obj: { [key: string]: any }): {
  [key: string]: any;
} {
  const result: { [key: string]: any } = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      result[key] = value;
    }
  }

  return result;
}

export function removeUndefinedNestedValues<
  T extends { [key: string]: any }
>(obj: { [key: string]: any }): T {
  const result: { [key: string]: any } = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      if (typeof value === "object" && !Array.isArray(value)) {
        const nestedResult = removeUndefinedNestedValues(value);
        if (Object.keys(nestedResult).length > 0) {
          result[key] = nestedResult;
        }
      } else if (Array.isArray(value)) {
        const filteredArray = value
          .map((item) => {
            if (typeof item === "object" && !Array.isArray(item)) {
              return removeUndefinedNestedValues(item);
            }
            return item;
          })
          .filter((item) => item !== undefined);

        if (filteredArray.length > 0) {
          result[key] = filteredArray;
        }
      } else {
        result[key] = value;
      }
    }
  }

  return result as T;
}
