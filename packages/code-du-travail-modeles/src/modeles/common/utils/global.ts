function parseIdcc(idcc: string): number {
  return parseInt(idcc, 10);
}

function formatIdcc(num: number | string): string {
  return `0000${num}`.slice(-4);
}

export { formatIdcc, parseIdcc };
