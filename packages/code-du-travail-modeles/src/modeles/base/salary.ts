import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../utils";
import type { SupportedCcIndemniteLicenciement } from "..";
import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
} from "./types";

export type LegalReferenceSalaryProps = {
  salaires: SalaryPeriods[];
};

export class ReferenceSalaryLegal
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.default>
{
  /**
   * Règle :
   * - soit 1/12*S1
   *  S1 : total des salaires perçus lors des 12 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   *
   * - soit 1/3*(S + ((P/12)*3))
   * S : total des salaires perçus lors des 3 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   * P : prime(s) ou gratification(s) de caractère annuel ou exceptionnel versée(s) pendant cette période (prise en compte prorata temporis)
   **/
  computeReferenceSalary({
    salaires = [],
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.default>): number {
    const rankedSalaires = rankByMonthArrayDescFrench(salaires);
    const primeValues = rankedSalaires.map((v) => v.prime).filter(nonNullable);
    const salaryValues = rankedSalaires.map((a) => a.value).filter(nonNullable);

    let moyenneSalaires = 0;
    let moyenne3DerniersMoisSalaires = 0;

    // calcul du salaire de reference
    moyenneSalaires = sum(salaryValues) / salaires.length;

    moyenne3DerniersMoisSalaires =
      sum(primeValues) / 12 +
      (sum(salaryValues.slice(0, 3)) - sum(primeValues)) / 3;

    const max = Math.max(moyenneSalaires, moyenne3DerniersMoisSalaires);

    return isNaN(max) ? 0 : max;
  }
}
