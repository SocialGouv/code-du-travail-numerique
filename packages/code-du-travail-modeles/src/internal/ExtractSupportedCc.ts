import type { Rule } from "publicodes";
import type Engine from "publicodes";

export type RuleNodeIdcc = Rule & {
  cdtn?: {
    idcc?: number;
    "préavis-retraite"?: boolean;
    special?: string;
  };
};

export enum SpecialAgreementType {
  BASIC = "BASIC",
  MISE_RETRAITE_5_ANS = "MISE_RETRAITE_5_ANS",
}

export type AgreementInfo = {
  idcc: number;
  preavisRetraite: boolean;
  specialAgreementType: SpecialAgreementType;
};

const switchSpecialProperties = (
  property: string | undefined
): SpecialAgreementType => {
  switch (property) {
    case "mise à la retraite 5 ans":
      return SpecialAgreementType.MISE_RETRAITE_5_ANS;
    default:
      return SpecialAgreementType.BASIC;
  }
};

export function extractImplementedCc(engine: Engine): Partial<AgreementInfo>[] {
  return Object.values(engine.getParsedRules())
    .flatMap((rule) => {
      const rawNode = rule.rawNode as RuleNodeIdcc;
      const cdtnNode = rawNode.cdtn;
      if (cdtnNode) {
        const idcc = cdtnNode.idcc;
        if (idcc) {
          return {
            idcc,
            preavisRetraite: cdtnNode["préavis-retraite"] ?? false,
            specialAgreementType: switchSpecialProperties(cdtnNode.special),
          };
        }
      }
      return null;
    })
    .flatMap((item) => (item !== null ? [item] : []));
}
