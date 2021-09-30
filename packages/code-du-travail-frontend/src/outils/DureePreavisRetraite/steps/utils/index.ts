export function formatSeniority(initialSeniority: string): string {
  const integerSeniority = parseInt(initialSeniority);
  return isNaN(integerSeniority) ? "0" : integerSeniority.toString();
}
