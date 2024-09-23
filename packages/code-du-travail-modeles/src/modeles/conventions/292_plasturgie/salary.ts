import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCc,
} from "../../common";
import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../common";

export class ReferenceSalary292
  implements IReferenceSalary<SupportedCc.IDCC0292>
{
  /**
   * "- soit S/12
   * S : total des salaires perçus lors des 12 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   *
   * - soit (S + ((P/12)*3))/3
   * S : total des salaires perçus lors des 3 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   * P : prime(s) ou gratification(s) de caractère annuel ou exceptionnel versée(s) pendant cette période (prise en compte prorata temporis)
   *
   * - soit S + (P/12)
   * S : salaire brut perçu lors du dernier mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   * P : prime(s) ou gratification(s) de caractère annuel ou exceptionnel versée(s) pendant cette période (prise en compte prorata temporis)"
   */
  computeReferenceSalary({
    salaires = [],
  }: ReferenceSalaryProps<SupportedCc.IDCC0292>): number {
    const rankedSalaires = rankByMonthArrayDescFrench(salaires);
    const salaryValues = rankedSalaires.map((a) => a.value).filter(nonNullable);
    const salaireMoyen12DerniersMois = sum(salaryValues) / salaryValues.length;

    const last3salaries = rankedSalaires
      .filter((s) => nonNullable(s.value))
      .slice(0, 3) as (SalaryPeriods & { value: number })[];

    const totalLast3SalariesWithoutPrime = sum(
      last3salaries.map((s) => s.value - (s.prime ?? 0))
    );
    const primesLast3months = last3salaries
      .map((a) => a.prime)
      .filter(nonNullable);
    const primesLast3monthsProrataTemporis = (sum(primesLast3months) / 12) * 3;
    const last3salariesWithPrime =
      (totalLast3SalariesWithoutPrime + primesLast3monthsProrataTemporis) / 3;

    const lastSalary = last3salaries[0];
    const lastSalaryPrime = lastSalary.prime ?? 0;
    const lastSalaryValue = lastSalary.value - lastSalaryPrime;
    const lastSalaryWithPrimeTemporis = lastSalaryValue + lastSalaryPrime / 12;

    return Math.max(
      salaireMoyen12DerniersMois,
      last3salariesWithPrime,
      lastSalaryWithPrimeTemporis
    );
  }
}
