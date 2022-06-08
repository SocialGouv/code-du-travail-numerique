export const deepEqualObject = (
  a: Record<string, any>,
  b: Record<string, any>
) => {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  for (let i = 0; i < aKeys.length; i++) {
    const key = aKeys[i];
    if (typeof a[key] === "object" && typeof b[key] === "object") {
      if (!deepEqualObject(a[key], b[key])) {
        return false;
      }
    } else if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
};
