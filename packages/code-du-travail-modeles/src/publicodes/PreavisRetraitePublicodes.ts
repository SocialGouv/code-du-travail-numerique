import type { EvaluatedNode } from "publicodes";

import type { Publicodes } from "./Publicodes";
import { PublicodesBase } from "./PublicodesBase";
import type { PublicodesPreavisRetraiteResult } from "./types";
import { PublicodesConvertedUnit, PublicodesSimulator } from "./types";
import { convertDaysIntoBetterUnit } from "./utils";

class PreavisRetraitePublicodes
  extends PublicodesBase<PublicodesPreavisRetraiteResult>
  implements Publicodes<PublicodesPreavisRetraiteResult>
{
  constructor(rules: string) {
    super(rules, PublicodesSimulator.PREAVIS_RETRAITE);
  }

  protected convertedResult(
    evaluatedNode: EvaluatedNode
  ): PublicodesPreavisRetraiteResult {
    if (evaluatedNode.nodeValue === false) {
      return {
        unit: PublicodesConvertedUnit.DAY,
        valid: false,
        value: -1,
        valueInDays: -1,
      };
    }
    return convertDaysIntoBetterUnit(
      evaluatedNode.nodeValue as unknown as string
    );
  }
}

export default PreavisRetraitePublicodes;
