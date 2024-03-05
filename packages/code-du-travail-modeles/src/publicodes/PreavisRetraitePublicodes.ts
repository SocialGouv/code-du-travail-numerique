import type { EvaluatedNode } from "publicodes";

import type { Publicodes } from "./Publicodes";
import { PublicodesBase } from "./PublicodesBase";
import type { PublicodesData, PublicodesPreavisRetraiteResult } from "./types";
import { PublicodesDefaultRules, PublicodesSimulator } from "./types";
import { convertDaysIntoBetterUnit } from "./utils/preavis-retraite";

class PreavisRetraitePublicodes
  extends PublicodesBase<PublicodesPreavisRetraiteResult>
  implements Publicodes<PublicodesPreavisRetraiteResult>
{
  constructor(rules: any) {
    super(rules, PublicodesDefaultRules[PublicodesSimulator.PREAVIS_RETRAITE]);
  }

  calculate(
    args: Record<string, string | undefined>,
    target?: string
  ): PublicodesData<PublicodesPreavisRetraiteResult> {
    return this.setSituation(args, target);
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
