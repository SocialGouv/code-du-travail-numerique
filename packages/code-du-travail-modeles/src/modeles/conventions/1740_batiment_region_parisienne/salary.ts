import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../common";

export type CC1740ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  salairesPendantPreavis: SalaryPeriods[];
};

export class ReferenceSalary1740
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC1740>
{
  /**
   * - soit (S + ((P/12)*3))/3
   * S : total des salaires perçus lors des 3 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut) (brut)
   * P : prime(s) annuelle(s) versée(s) pendant cette période (prise en compte prorata temporis)
   *
   * - soit 1/12*S
   * S : total des salaires perçus lors des 12 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   */
  computeReferenceSalary({
    salaires,
    salairesPendantPreavis,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC1740>): number {
    const rankedSalairesSansPréavis = rankByMonthArrayDescFrench(
      salaires
    ).filter((v) => nonNullable(v.value));
    const rankedSalairesPendantPreavis = rankByMonthArrayDescFrench(
      salairesPendantPreavis
    ).filter((v) => nonNullable(v.value));

    const rankedSalaires = [
      ...rankedSalairesPendantPreavis,
      ...rankedSalairesSansPréavis,
    ].slice(0, 12);

    const salaryValues = rankedSalaires.map((a) => a.value).filter(nonNullable);
    const moyenneSalaires = sum(salaryValues) / rankedSalaires.length;

    const dernier3Mois = rankedSalaires.slice(0, 3);
    const salaryValues3DerniersMois = dernier3Mois
      .map((a) => a.value)
      .filter(nonNullable);

    const sommeSalaireDes3DerniersMois: number = sum(salaryValues3DerniersMois);

    const primes = dernier3Mois.map((v) => v.prime).filter(nonNullable);

    const formuleCc =
      (sommeSalaireDes3DerniersMois + (sum(primes) / 12) * 3) / 3;

    return Math.max(moyenneSalaires, formuleCc);
  }
}
