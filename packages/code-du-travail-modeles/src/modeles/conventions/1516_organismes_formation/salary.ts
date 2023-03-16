import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../common";

export type CC1516ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  salairesPendantPreavis: SalaryPeriods[];
};

export class ReferenceSalary1516
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC1516>
{
  /**
   * Règle :
   * - soit 1/12*S
   *  S : total des salaires perçus lors des 12 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   *
   * - soit S + (P/12)
   * S : salaire le plus élevé perçu au cours des 3 derniers mois de travail (brut)
   * P : prime(s) ou gratification(s) de caractère annuel ou exceptionnel versée au salarié pendant cette période prise en compte prorata temporis
   **/
  computeReferenceSalary({
    salaires,
    salairesPendantPreavis,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC1516>): number {
    const rankedSalaires = rankByMonthArrayDescFrench(salaires);
    const salaryValues = rankedSalaires.map((a) => a.value).filter(nonNullable);
    const moyenneSalaires = sum(salaryValues) / rankedSalaires.length;

    const rankedSalairesPendantPreavis = rankByMonthArrayDescFrench(
      salairesPendantPreavis
    );
    const last3salaries = [...rankedSalairesPendantPreavis, ...rankedSalaires]
      .filter((s) => nonNullable(s?.value))
      .slice(0, 3)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .sort((first, second) => second.value! - first.value!);
    const meilleurSalaireDes3DerniersMois = last3salaries[0];

    const formuleCc =
      (meilleurSalaireDes3DerniersMois.value ?? 0) +
      (meilleurSalaireDes3DerniersMois.prime ?? 0) / 12;

    return Math.max(moyenneSalaires, formuleCc);
  }
}
