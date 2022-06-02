export const detectUndefinedOrFalseValuesOfObject = (obj: any) => {
  for (const key in obj) {
    if (obj[key] === undefined || obj[key] === false) {
      return true;
    }
  }
  return false;
};
