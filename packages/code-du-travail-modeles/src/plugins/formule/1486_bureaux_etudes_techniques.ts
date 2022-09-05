import { round } from "../../utils";
import type { SupportedCcIndemniteLicenciement } from "..";
import {
  CatPro1486,
  TypeLicenciement1486,
} from "../salaire-reference/1486_bureaux_etudes_techniques";
import { FormulaLegal } from "./legal";
import type { Formula, FormulaProps, IFormula } from "./types";

export type Formula1486Props = {
  category: CatPro1486;
  typeLicenciement: TypeLicenciement1486;
  seniority: number;
  refSalary: number;
};

export class Formula1486
  implements IFormula<SupportedCcIndemniteLicenciement.IDCC1486>
{
  computeFormula({
    seniority,
    refSalary,
    category,
    typeLicenciement,
  }: FormulaProps<SupportedCcIndemniteLicenciement.IDCC1486>): Formula {
    let formula = "";
    const explanations = [];
    const year = round(seniority) < 2 ? "an" : "ans";
    if (typeLicenciement === TypeLicenciement1486.refus) {
      return new FormulaLegal().computeFormula({
        isForInaptitude: false,
        refSalary,
        seniority,
      });
    } else if (category === CatPro1486.chargeEnquete && seniority >= 2) {
      formula = `1/5 * Sref * A`;
      explanations.push(`A : Ancienneté totale (${round(seniority)} ${year})`);
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    } else if (category === CatPro1486.ingeCadre && seniority >= 2) {
      formula = `1/3 * Sref * A`;
      explanations.push(`A : Ancienneté totale (${round(seniority)} ${year})`);
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    } else if (
      category === CatPro1486.etam &&
      seniority >= 2 &&
      seniority < 20
    ) {
      formula = `0.25 * Sref * A`;
      explanations.push(`A : Ancienneté totale (${round(seniority)} ${year})`);
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    } else if (category === CatPro1486.etam && seniority >= 20) {
      formula = `0.30 * Sref * A`;
      explanations.push(`A : Ancienneté totale (${round(seniority)} ${year})`);
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    }
    return { explanations, formula };
  }
}
