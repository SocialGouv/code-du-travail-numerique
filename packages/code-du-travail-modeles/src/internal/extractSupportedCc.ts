import type { Rule } from "publicodes";
import type Engine from "publicodes";

import type { AgreementInfo } from "../modeles/common";
import { getSupportedAgreement, ToolName } from "../modeles/common";

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
              supportedIndemniteLicencimentCc !== null
                ? !!supportedIndemniteLicencimentCc
                : null,
            preavisRetraite: cdtnNode["préavis-retraite"] ?? false,
          };
        }
      }
      return null;
    })
    .flatMap((item) => (item !== null ? [item] : []));
}
