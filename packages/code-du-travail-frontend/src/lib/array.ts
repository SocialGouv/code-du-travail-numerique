import { hasObjectNullOrUndefined } from "./object";

export const detectNullOrUndefinedOrNaNInArray = (array: any[]) => {
  return array.some((item) => {
    if (item && typeof item === "object") {
      const keys = Object.keys(item);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (Array.isArray(item[key])) {
          return detectNullOrUndefinedOrNaNInArray(item[key]);
        } else if (typeof item[key] === "object") {
          return hasObjectNullOrUndefined(item[key]);
        }
        if (
          item[key] === null ||
          item[key] === undefined ||
          Number.isNaN(item[key])
        ) {
          return true;
        }
      }
    }
    return item === null || item === undefined || Number.isNaN(item);
  });
};
