import { OldReference, References } from "@socialgouv/modeles-social";

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

export const sanitizePublicodesValue = (raw?: string): string => {
  if (!raw) return "";
  return raw.replace(/&apos;/g, "'").replace(/^'|'$/g, "");
};
