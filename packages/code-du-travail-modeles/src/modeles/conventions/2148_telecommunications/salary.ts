import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../common";

export type CC2148ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  salairesPendantPreavis: SalaryPeriods[];
};

export class ReferenceSalary2148
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC2148>
{
  mapSituation(
    args: Record<string, string | undefined>
  ): ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC2148> {
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
   * S/12
   *  S : total des salaires perçus lors des 12 derniers mois de présence dans l'entreprise (brut, préavis inclu)
   **/
  computeReferenceSalary({
    salaires,
    salairesPendantPreavis,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC2148>): number {
    const rankedSalaires = rankByMonthArrayDescFrench(salaires);
    const rankedSalairesPendantPreavis = rankByMonthArrayDescFrench(
      salairesPendantPreavis
    );
    const salaryValues = rankedSalaires.map((a) => a.value).filter(nonNullable);

    const totalSalaryValues = [
      ...rankedSalairesPendantPreavis.map((a) => a.value).filter(nonNullable),
      ...salaryValues,
    ].slice(0, 12);

    return sum(totalSalaryValues);
  }
}
