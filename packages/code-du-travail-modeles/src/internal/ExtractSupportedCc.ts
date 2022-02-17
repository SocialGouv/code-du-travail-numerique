import type { Rule } from "publicodes";
import type Engine from "publicodes";

export type RuleNodeIdcc = Rule & {
  cdtn?: {
    idcc?: number;
    "préavis-retraite"?: boolean;
  };
};

export type AgreementInfo = {
  idcc: number;
  preavisRetraite: boolean;
};

export function extractSupportedCc(engine: Engine): Partial<AgreementInfo>[] {
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
          };
        }
      }
      return null;
    })
    .flatMap((item) => (item !== null ? [item] : []));
}
