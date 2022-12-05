import type { Rule } from "publicodes";
import type Engine from "publicodes";

import type { AgreementInfo } from "../modeles/common";

export type RuleNodeIdcc = Rule & {
  cdtn?: {
    idcc?: number;
    "préavis-retraite"?: boolean;
    "indemnité-licenciement"?: boolean;
    "indemnité-licenciement-sans-legal"?: boolean;
    "indemnité-licenciement-sans-heritage-formule-legal"?: boolean;
  };
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
            indemniteLicenciement: cdtnNode["indemnité-licenciement"] ?? false,
            indemniteLicenciementSansLegal:
              cdtnNode["indemnité-licenciement-sans-legal"] ?? false,
            preavisRetraite: cdtnNode["préavis-retraite"] ?? false,
            indemniteLicenciementSansHeritageFormuleLegal:
              cdtnNode["indemnité-licenciement-sans-heritage-formule-legal"] ??
              false,
          };
        }
      }
      return null;
    })
    .flatMap((item) => (item !== null ? [item] : []));
}
