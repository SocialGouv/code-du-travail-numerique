import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../common";

export type CC1483ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  salairesPendantPreavis: SalaryPeriods[];
};

export class ReferenceSalary1483
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC1483>
{
  /**
   * Règle :
   * - soit 1/12 * S
   *  S : total des salaires perçus lors des 12 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   *
   * - soit 1/3 * S + (P/12) * 3
   * S : total des salaires perçus lors des 3 derniers mois précédant la date d'expiration du préavis, effectué ou non (brut)
   * P : prime(s) ou gratification(s) de caractère annuel ou exceptionnel versée(s) pendant cette période (prise en compte prorata temporis)
   **/
  computeReferenceSalary({
    salaires,
    salairesPendantPreavis,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC1483>): number {
    const rankedSalaires = rankByMonthArrayDescFrench(salaires);
    const salaryValues = rankedSalaires.map((a) => a.value).filter(nonNullable);
    const moyenneSalaires = sum(salaryValues) / rankedSalaires.length;

    const rankedSalairesPendantPreavis = rankByMonthArrayDescFrench(
      salairesPendantPreavis
    );
    const last3salaries = [...rankedSalairesPendantPreavis, ...rankedSalaires]
      .filter((s) => nonNullable(s.value))
      .slice(0, 3);

    const salaireLast3months = last3salaries
      .map((a) => a.value)
      .filter(nonNullable);

    const primesLast3months = last3salaries
      .map((a) => a.prime)
      .filter(nonNullable);
    const primesLast3monthsProrataTemporis = sum(primesLast3months) / 12;

    const formuleCc =
      sum(salaireLast3months) / 3 + 3 * primesLast3monthsProrataTemporis;

    return Math.max(moyenneSalaires, formuleCc);
  }
}
