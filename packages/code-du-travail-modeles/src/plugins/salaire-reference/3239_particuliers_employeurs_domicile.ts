import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../utils";
import type { SalaryPeriods, SupportedCcIndemniteLicenciement } from "..";
import { ReferenceSalaryLegal } from "./legal";
import type { IReferenceSalary, ReferenceSalaryProps } from "./types";

export enum CatPro3239 {
  SALARIE_PARTICULIER_EMPLOYEUR = "Salarié du particulier employeur",
  ASSISTANT_MATERNEL = "Assistant maternel",
}

export type CC3239ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  catPro: CatPro3239;
};

export class ReferenceSalary3239
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC3239>
{
  /**
   * Règle :
   * - si la catégorie professionnelle est "Assistant maternel" et que le licenciement n'est pas dû à un retrait d'Agrément
   * - S
   * S : total des salaires perçus depuis l'engagement (brut)
   *
   * - Dans le cas où c'est le salarié particulier employeur, on renvoie au légal
   **/
  computeReferenceSalary({
    salaires = [],
    catPro,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC3239>): number {
    const rankedSalaires = rankByMonthArrayDescFrench(salaires);
    const salaryValues = rankedSalaires.map((a) => a.value).filter(nonNullable);
    const moyenneSalaires = sum(salaryValues) / rankedSalaires.length;
    if (catPro === CatPro3239.SALARIE_PARTICULIER_EMPLOYEUR) {
      return new ReferenceSalaryLegal().computeReferenceSalary({ salaires });
    }
    return moyenneSalaires;
  }
}
