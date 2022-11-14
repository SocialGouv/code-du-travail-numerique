import type { SupportedCcIndemniteLicenciement } from "..";
import { FormulaLegal } from "./legal";
import type { Formula, FormulaProps, IFormula } from "./types";

export class Formula843
  implements IFormula<SupportedCcIndemniteLicenciement.IDCC0843>
{
  computeFormula({
    seniority,
    refSalary,
  }: FormulaProps<SupportedCcIndemniteLicenciement.IDCC0843>): Formula {
    if (seniority >= 2) {
      return new FormulaLegal().computeFormula({
        isForInaptitude: false,
        refSalary,
        seniority,
      });
    }
    return { explanations: [], formula: "" };
  }
}
