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
  mapSituation(
    args: Record<string, string | undefined>
  ): ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC1516> {
    return {
      salaires: args.salaryPeriods
        ? (JSON.parse(args.salaryPeriods) as SalaryPeriods[])
        : [],
      salairesPendantPreavis: args.noticeSalaryPeriods
        ? JSON.parse(args.noticeSalaryPeriods)
        : undefined,
    };
  }

  removeSpecificSituation(
    args: Record<string, string | undefined>
  ): Record<string, string | undefined> {
    delete args.noticeSalaryPeriods;
    return args;
  }

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
      .filter((s) => nonNullable(s.value))
      .slice(0, 3) as (SalaryPeriods & { value: number })[];

    const meilleurSalaireDes3DerniersMois = Math.max(
      ...last3salaries.map((s) => s.value - (s.prime ?? 0))
    );

    const primesLast3months = last3salaries
      .map((a) => a.prime)
      .filter(nonNullable);
    const primesLast3monthsProrataTemporis = sum(primesLast3months) / 12;
    const formuleCc =
      meilleurSalaireDes3DerniersMois + primesLast3monthsProrataTemporis;

    return Math.max(moyenneSalaires, formuleCc);
  }
}
