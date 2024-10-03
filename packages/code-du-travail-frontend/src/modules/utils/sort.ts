export const orderByAlpha = <T>(a: T, b: T, field: keyof T): number => {
  const valueA = String(a[field]);
  const valueB = String(b[field]);

  return valueA.localeCompare(valueB, "fr", {
    ignorePunctuation: true,
  });
};
