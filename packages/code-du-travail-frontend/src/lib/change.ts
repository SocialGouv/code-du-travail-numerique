export const diffObject = (
  obj1: Record<string, any> = {},
  obj2: Record<string, any> = {}
): Record<string, any> =>
  Object.entries({ ...obj1, ...obj2 }).reduce((acc, [key, value]) => {
    if (
      !Object.values(obj1).includes(value) ||
      !Object.values(obj2).includes(value)
    )
      acc[key] = value;

    return acc;
  }, {});

export const debounce = (callback, timeMs = 300): any => {
  let interval;
  return (...args: any) => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      interval = null;
      callback(...args);
    }, timeMs);
  };
};
