import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../utils";
import type { SalaryPeriods, SupportedCcIndemniteLicenciement } from "..";
import { ReferenceSalaryLegal } from "./legal";
import type { IReferenceSalary, ReferenceSalaryProps } from "./types";

export type CC650ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  seniority: number;
};

export class ReferenceSalary650
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC650>
{
  /**
   * Règle :
   * - si < 8 ans (apprécié à la date de fin du préavis, exécuté ou non)
   * - S1/12
   * S1 : total des salaires perçus lors des 12 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   * - sinon
   * soit S1/12
   * S1 : total des salaires perçus lors des 12 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   * soit 1/3*(S + ((P/12)*3))
   * S : total des salaires perçus lors des 3 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   * P : prime(s) ou gratification(s) de caractère annuel ou exceptionnel versée(s) pendant cette période (prise en compte prorata temporis)
   **/
  computeReferenceSalary({
    salaires = [],
    seniority,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC650>): number {
    if (seniority < 8) {
      const rankedSalaires = rankByMonthArrayDescFrench(salaires);
      const salaryValues = rankedSalaires
        .map((a) => a.value)
        .filter(nonNullable);
      const moyenneSalaires = sum(salaryValues) / salaires.length;
      return isNaN(moyenneSalaires) ? 0 : moyenneSalaires;
    } else {
      return new ReferenceSalaryLegal().computeReferenceSalary({ salaires });
    }
  }
}
