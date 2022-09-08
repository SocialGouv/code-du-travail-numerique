import { FormulaLegal } from "../../../lib/plugins/formule/legal";
import { round } from "../../utils";
import type { SupportedCcIndemniteLicenciement } from "..";
import { CatPro3239 } from "../salaire-reference/3239_particuliers_employeurs_domicile";
import type { Formula, FormulaProps, IFormula } from "./types";

export type Formula3239Props = {
  category: CatPro3239;
  seniority: number;
  refSalary: number;
};

export class Formula3239
  implements IFormula<SupportedCcIndemniteLicenciement.IDCC3239>
{
  computeFormula({
    seniority,
    refSalary,
    category,
  }: FormulaProps<SupportedCcIndemniteLicenciement.IDCC3239>): Formula {
    let formula = "";
    const explanations = [];
    if (category === CatPro3239.ASSISTANT_MATERNEL && seniority >= 9 / 12) {
      formula = `1 / 80 * Sref`;
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    } else if (
      category === CatPro3239.SALARIE_PARTICULIER_EMPLOYEUR &&
      seniority >= 8 / 12
    ) {
      return new FormulaLegal().computeFormula({
        isForInaptitude: false,
        refSalary,
        seniority,
      });
    }
    return { explanations, formula };
  }
}
