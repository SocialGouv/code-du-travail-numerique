import type { Rule } from "publicodes";
import type Engine from "publicodes";

import type { AgreementInfo } from "../modeles/common";
import { SupportedTypes } from "../modeles/common";

export type RuleNodeIdcc = Rule & {
  cdtn?: {
    idcc?: number;
    "préavis-retraite"?: boolean;
    "indemnité-licenciement"?: boolean;
  };
};

function getSupportedStatus(activated?: boolean) {
  switch (activated) {
    case undefined:
      return SupportedTypes.SOON_SUPPORTED;
    case true:
      return SupportedTypes.FULLY_SUPPORTED;
    case false:
    default:
      return SupportedTypes.NEVER_SUPPORTED;
  }
}

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
            indemniteLicenciement: getSupportedStatus(
              cdtnNode["indemnité-licenciement"]
            ),
            preavisRetraite: getSupportedStatus(cdtnNode["préavis-retraite"]),
          };
        }
      }
      return null;
    })
    .flatMap((item) => (item !== null ? [item] : []));
}
