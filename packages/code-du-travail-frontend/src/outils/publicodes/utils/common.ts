import { References, supportedCcn } from "@socialgouv/modeles-social";
import { EvaluatedNode } from "publicodes";

import { AgreementSupportInfo } from "../../common/Agreement/types";
import { OldReference, PublicodesResult, PublicodesSimulator } from "../types";
import { convertDaysIntoBetterUnit } from "./preavis-retraite";

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
  return refs.map((ref) => {
    return { article: ref.ref, url: ref.refUrl };
  });
}

export function formatOuiNon(toBeFormmatted: boolean): string {
  return toBeFormmatted ? "oui" : "non";
}
export function formatNumber(toBeFormmatted: number): string {
  return isNaN(toBeFormmatted) ? "0" : toBeFormmatted.toString();
}

export function formatSeniority(initialSeniority: string): string {
  return formatNumber(parseInt(initialSeniority));
}

export const getSupportedCC = (): AgreementSupportInfo[] =>
  supportedCcn.map((item) => ({
    fullySupported: item.preavisRetraite,
    idcc: item.idcc,
  }));

export const convertedResult = (
  simulator: PublicodesSimulator,
  evaluatedNode: EvaluatedNode
): PublicodesResult => {
  switch (simulator) {
    case PublicodesSimulator.PREAVIS_RETRAITE:
      return convertDaysIntoBetterUnit(
        evaluatedNode.nodeValue as unknown as string
      );
    case PublicodesSimulator.INDEMNITE_LICENCIEMENT:
      return {
        unit: evaluatedNode.unit,
        value: evaluatedNode.nodeValue,
      };
    default:
      throw new Error(`Unsupported simulator: ${simulator}`);
  }
};
