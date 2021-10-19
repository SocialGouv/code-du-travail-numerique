import type { Rule } from "publicodes";
import type Engine from "publicodes";

export type RuleNodeIdcc = Rule & {
  cdtn: AgreementCdtnInfo;
};

export type AgreementInfo = {
  idcc: number;
  preavisRetraite: boolean;
  cdtnInfo: AgreementCdtnInfo;
};

export enum AgreementType {
  OVERRIDE_ANCIENNETE = "overrideSeniority",
}

export type AgreementCdtnInfo = {
  type: AgreementType;
  property: string;
  value: string;
  question: string;
  idcc: number;
  preavisRetraite: boolean;
};

export function extractImplementedCc(engine: Engine): Partial<AgreementInfo>[] {
  return Object.values(engine.getParsedRules())
    .flatMap((rule) => {
      const rawNode = rule.rawNode as RuleNodeIdcc;
      const cdtnInfo = rawNode.cdtn;
      if (cdtnInfo) {
        const idcc = cdtnInfo.idcc;
        if (idcc) {
          return {
            cdtnInfo,
            idcc,
            preavisRetraite: cdtnInfo.preavisRetraite ?? false,
          };
        }
      }
      return null;
    })
    .flatMap((item) => (item !== null ? [item] : []));
}
