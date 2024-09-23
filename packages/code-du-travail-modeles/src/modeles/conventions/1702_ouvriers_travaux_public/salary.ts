import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCc,
} from "../../common";
import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../common";

export type CC1702ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  salairesPendantPreavis: SalaryPeriods[];
};

export class ReferenceSalary1702
  implements IReferenceSalary<SupportedCc.IDCC1702>
{
  mapSituation(
    args: Record<string, string | undefined>
  ): ReferenceSalaryProps<SupportedCc.IDCC1702> {
    return {
      salaires: args.salaryPeriods
        ? (JSON.parse(args.salaryPeriods) as SalaryPeriods[])
        : [],
      salairesPendantPreavis: args.noticeSalaryPeriods
        ? JSON.parse(args.noticeSalaryPeriods)
        : [],
    };
  }

  /**
   * Règle :
   * - soit (S + ((P/12)*3))/3
   *   S : total des salaires perçus lors des 3 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   *   P : prime(s) annuelle(s) versée(s) pendant cette période (prise en compte prorata temporis)
   *
   * - soit 1/12*S
   *   S : total des salaires perçus lors des 12 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)"
   **/
  computeReferenceSalary({
    salaires,
    salairesPendantPreavis,
  }: ReferenceSalaryProps<SupportedCc.IDCC1702>): number {
    const rankedSalairesSansPréavis = rankByMonthArrayDescFrench(salaires);
    const rankedSalairesPendantPreavis = rankByMonthArrayDescFrench(
      salairesPendantPreavis
    );
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
