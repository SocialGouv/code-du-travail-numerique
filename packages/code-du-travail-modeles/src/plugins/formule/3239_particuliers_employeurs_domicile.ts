import { round } from "../../utils";
import type { SupportedCcIndemniteLicenciement } from "..";
import { CatPro3239 } from "../salaire-reference/3239_particuliers_employeurs_domicile";
import { FormulaLegal } from "./legal";
import type { Formula, FormulaProps, IFormula } from "./types";

export type Formula3239Props = {
  category: CatPro3239;
  totalSalary: number;
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
    totalSalary,
  }: FormulaProps<SupportedCcIndemniteLicenciement.IDCC3239>): Formula {
    let formula = "";
    const explanations = [];
    if (category === CatPro3239.assistantMaternel && seniority >= 9 / 12) {
      formula = `1 / 80 * S`;
      explanations.push(
        `S : total des salaires perçus depuis l'engagement (${round(
          totalSalary
        )} €)`
      );
    } else if (
      category === CatPro3239.salarieParticulierEmployeur &&
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
