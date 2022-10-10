export function isFloat(n: number): boolean {
  return Number(n) === n && n % 1 !== 0;
}

export function formatNumber(toBeFormatted: number): string {
  return isNaN(toBeFormatted) ? "0" : toBeFormatted.toString();
}

export const sum = (values: number[]): number =>
  values.reduce((a, b) => a + b, 0);

export const round = (value: number, decimals = 2): number => {
  const tenToPower = Math.pow(10, decimals);
  return Math.round(value * tenToPower) / tenToPower;
};

export const year = (value: number): string => {
  return round(value) < 2 ? "an" : "ans";
};

export const min0 = (value: number): number => {
  return Math.max(value, 0);
};
