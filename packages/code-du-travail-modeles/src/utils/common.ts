export function isFloat(n: number): boolean {
  return Number(n) === n && n % 1 !== 0;
}

export function formatNumber(toBeFormmatted: number): string {
  return isNaN(toBeFormmatted) ? "0" : toBeFormmatted.toString();
}

export const sum = (values: number[]): number =>
  values.reduce((a, b) => a + b, 0);

export const round = (value: number, decimals = 2): number => {
  const tenToPower = Math.pow(10, decimals);
  return Math.round(value * tenToPower) / tenToPower;
};
