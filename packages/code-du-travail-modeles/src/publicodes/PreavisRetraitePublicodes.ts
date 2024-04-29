import type { EvaluatedNode } from "publicodes";

import { PublicodesBase } from "./PublicodesBase";
import type {
  PublicodesOutput,
  PublicodesPreavisRetraiteResult,
} from "./types";
import { PublicodesDefaultRules, PublicodesSimulator } from "./types";
import { convertDaysIntoBetterUnit } from "./utils/preavis-retraite";

class PreavisRetraitePublicodes extends PublicodesBase<PublicodesPreavisRetraiteResult> {
  constructor(rules: any) {
    super(rules, PublicodesDefaultRules[PublicodesSimulator.PREAVIS_RETRAITE]);
  }

  calculate(
    args: Record<string, string | undefined>
  ): PublicodesOutput<PublicodesPreavisRetraiteResult> {
    throw new Error(
      `Not implemented yet. Input given: ${JSON.stringify(args)}`
    );
  }

  protected convertedResult(
    evaluatedNode: EvaluatedNode
  ): PublicodesPreavisRetraiteResult {
    return convertDaysIntoBetterUnit(
      evaluatedNode.nodeValue as unknown as string
    );
  }
}

export default PreavisRetraitePublicodes;
