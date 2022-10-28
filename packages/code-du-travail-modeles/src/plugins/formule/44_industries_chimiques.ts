import { round } from "../../utils";
import type { SupportedCcIndemniteLicenciement } from "..";
import { CategoryPro44 } from "../salaire-reference/44_industries_chimiques";
import type { Formula, FormulaProps, IFormula } from "./types";

export type Formula44Props = {
  category: CategoryPro44;
  isEconomicFiring: boolean;
  age: number;
  seniority: number;
  refSalary: number;
};

export class Formula44
  implements IFormula<SupportedCcIndemniteLicenciement.IDCC0044>
{
  computeFormula({
    seniority,
    refSalary,
    age,
    category,
    isEconomicFiring,
  }: FormulaProps<SupportedCcIndemniteLicenciement.IDCC0044>): Formula {
    switch (category) {
      case CategoryPro44.ouvrier:
        return this.computeFormulaForOuvriers({
          age,
          isEconomicFiring,
          refSalary,
          seniority,
        });
      case CategoryPro44.techniciens:
        return this.computeFormulaForTechniciens({
          age,
          isEconomicFiring,
          refSalary,
          seniority,
        });
      case CategoryPro44.inge:
        return this.computeFormulaForInge({
          age,
          isEconomicFiring,
          refSalary,
          seniority,
        });
    }
  }

  private computeFormulaForOuvriers({
    seniority,
    refSalary,
    age,
    isEconomicFiring,
  }: Omit<
    FormulaProps<SupportedCcIndemniteLicenciement.IDCC0044>,
    "category"
  >): Formula {
    let formula = "";
    const explanations: string[] = [];
    const year = round(seniority) < 2 ? "an" : "ans";
    if (isEconomicFiring) {
      if (seniority >= 5 && age >= 50) {
        formula = "2 * Sref + 3 / 10 * Sref * A";
      } else if (seniority >= 2) {
        formula = "3 / 10 * Sref * A";
      } else if (seniority >= 1) {
        formula = "Sref";
      }
    } else {
      if (seniority >= 5 && age > 55) {
        formula = "2 * Sref + 3 / 10 * Sref * A";
      } else if (seniority >= 5 && age > 50) {
        formula = "3 / 10 * Sref * A + Sref";
      } else if (seniority >= 2) {
        formula = "3 / 10 * Sref * A";
      }
    }
    if (formula !== "") {
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    }
    if (
      formula !== "" &&
      !(seniority >= 1 && seniority < 2 && isEconomicFiring)
    ) {
      explanations.push(
        `A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (${round(
          seniority
        )} ${year})`
      );
    }
    return { explanations, formula };
  }

  private computeFormulaForTechniciens({
    seniority,
    refSalary,
    age,
    isEconomicFiring,
  }: Omit<
    FormulaProps<SupportedCcIndemniteLicenciement.IDCC0044>,
    "category"
  >): Formula {
    let formula = "";
    const explanations: string[] = [];
    const year = round(seniority) < 2 ? "an" : "ans";
    if (isEconomicFiring) {
      if (seniority >= 5 && age >= 50) {
        formula = "2 * Sref + 3 / 10 * Sref * A1";
      } else if (seniority >= 2) {
        formula = "3 / 10 * Sref * A1";
      } else if (seniority >= 1) {
        formula = "Sref";
      }
    } else {
      if (seniority >= 5 && age > 55) {
        formula = "2 * Sref + 3 / 10 * Sref * A1";
      } else if (seniority >= 5 && age > 50) {
        formula = "Sref + 3 / 10 * Sref * A1";
      } else if (seniority >= 2) {
        formula = "3 / 10 * Sref * A1";
      }
    }
    if (formula !== "") {
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    }
    if (
      formula !== "" &&
      !(seniority >= 1 && seniority < 2 && isEconomicFiring)
    ) {
      explanations.push(
        `A1 : Années à compter de la date d'entrée dans l'entreprise (${round(
          seniority
        )} ${year})`
      );
      if (seniority >= 10) {
        formula += " + 1 / 10 * Sref * A2";
        explanations.push(
          `A2 : A partir de 10 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (${round(
            seniority
          )} ${year})`
        );
      }
      if (seniority >= 20) {
        formula += " + 1 / 10 * Sref * A3";
        explanations.push(
          `A3 : A partir de 20 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (${round(
            seniority
          )} ${year})`
        );
      }
    }
    return { explanations, formula };
  }

  private computeFormulaForInge({
    seniority,
    refSalary,
    age,
    isEconomicFiring,
  }: Omit<
    FormulaProps<SupportedCcIndemniteLicenciement.IDCC0044>,
    "category"
  >): Formula {
    let formula = "";
    const explanations: string[] = [];
    if (isEconomicFiring) {
      if (seniority > 5 && age >= 50 && age <= 55) {
        formula = "2 * Sref + 4 / 10 * Sref * A1";
      } else if (seniority >= 2) {
        formula = "4 / 10 * Sref * A1";
      } else if (seniority >= 1) {
        formula = "Sref";
      }
    } else {
      if (seniority >= 5 && age > 55) {
        formula = "2 * Sref + 4 / 10 * Sref * A1";
      } else if (seniority >= 5 && age > 45) {
        formula = "Sref + 4 / 10 * Sref * A1";
      } else if (seniority >= 2) {
        formula = "4 / 10 * Sref * A1";
      }
    }
    if (formula !== "") {
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    }
    if (
      formula !== "" &&
      !(seniority >= 1 && seniority < 2 && isEconomicFiring)
    ) {
      const maxSeniority = Math.min(round(seniority), 10);
      const yearAfterDiff = maxSeniority < 2 ? "an" : "ans";
      explanations.push(
        `A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (${maxSeniority} ${yearAfterDiff})`
      );
      if (seniority > 10) {
        const maxSeniority2 = Math.min(round(seniority - 10), 5);
        const yearAfterDiff2 = maxSeniority2 < 2 ? "an" : "ans";
        formula += " + 6 / 10 * Sref * A2";
        explanations.push(
          `A2 : Années au-delà de 10 ans pour la tranche de 10 à 15 ans (${maxSeniority2} ${yearAfterDiff2})`
        );
      }
      if (seniority > 15) {
        const maxSeniority3 = round(seniority - 15);
        const yearAfterDiff3 = maxSeniority3 < 2 ? "an" : "ans";
        formula += " + 8 / 10 * Sref * A3";
        explanations.push(
          `A3 : Années au-delà de 15 ans (${maxSeniority3} ${yearAfterDiff3})`
        );
      }
    }
    return { explanations, formula };
  }
}
