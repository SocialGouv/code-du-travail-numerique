import { References } from "@socialgouv/modeles-social";
import { OldReference } from "../types";

export const reverseValues = (
  values: Record<string, string>
): Record<string, string> =>
  Object.entries(values).reduce((state, [key, value]) => {
    state[value] = key;
    return state;
  }, {});

export function formatRefs(refs: Array<OldReference>): Array<References> {
  return refs
    .filter((item) => item.ref !== null && item.refUrl !== null)
    .map((ref) => {
      return { article: ref.ref, url: ref.refUrl };
    }) as References[];
}

export function formatNumberAsString(toBeFormmatted: number): string {
  return isNaN(toBeFormmatted) ? "0" : toBeFormmatted.toString();
}
