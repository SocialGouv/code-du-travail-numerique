import { References } from "@socialgouv/modeles-social";
import { OldReference } from "../types";

export const reverseValues = (
  values: Record<string, string>
): Record<string, string> =>
  Object.entries(values).reduce((state, [key, value]) => {
    state[value] = key;
    return state;
  }, {});

export function isFloat(n: number): boolean {
  return Number(n) === n && n % 1 !== 0;
}

export function formatRefs(refs: Array<OldReference>): Array<References> {
  return refs
    .filter((item) => item.ref !== null && item.refUrl !== null)
    .map((ref) => {
      return { article: ref.ref, url: ref.refUrl };
    }) as References[];
}

export function formatNumber(toBeFormmatted: number): string {
  return isNaN(toBeFormmatted) ? "0" : toBeFormmatted.toString();
}

export function formatSeniority(initialSeniority: string): string {
  return formatNumber(parseInt(initialSeniority));
}
