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

export const hasObjectNullOrUndefined = (obj: any) => {
  if (obj === null || obj === undefined || Number.isNaN(obj)) {
    return true;
  }
  if (typeof obj === "object") {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (hasObjectNullOrUndefined(obj[key])) {
        return true;
      }
    }
  }
  return false;
};
