export function isFloat(n: number): boolean {
  return Number(n) === n && n % 1 !== 0;
}

export function formatNumber(toBeFormmatted: number): string {
  return isNaN(toBeFormmatted) ? "0" : toBeFormmatted.toString();
}

export const sum = (values: number[]): number =>
  values.reduce((a, b) => a + b, 0);
