import type { Rule } from "publicodes";
import type Engine from "publicodes";

import type { AgreementInfo } from "../modeles/common";
import {
  getSupportedAgreement,
  SupportedTypes,
  ToolName,
} from "../modeles/common";

export type RuleNodeIdcc = Rule & {
  cdtn?: {
    idcc?: number;
    "préavis-retraite"?: boolean;
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
          const supportedIndemniteLicencimentCc = getSupportedAgreement(
            idcc,
            ToolName.INDEMNITE_LICENCIEMENT
          );
          return {
            idcc,
            indemniteLicenciement:
              supportedIndemniteLicencimentCc !== undefined
                ? supportedIndemniteLicencimentCc
                  ? SupportedTypes.FULLY_SUPPORTED
                  : SupportedTypes.NEVER_SUPPORTED
                : SupportedTypes.SOON_SUPPORTED,
            preavisRetraite: cdtnNode["préavis-retraite"]
              ? SupportedTypes.FULLY_SUPPORTED
              : SupportedTypes.NEVER_SUPPORTED,
          };
        }
      }
      return null;
    })
    .flatMap((item) => (item !== null ? [item] : []));
}
