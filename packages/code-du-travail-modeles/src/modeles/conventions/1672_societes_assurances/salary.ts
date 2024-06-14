import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCc,
} from "../../common";
import { rankByMonthArrayDescFrench } from "../../common";

export type CC1672ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  salairesPendantPreavis: SalaryPeriods[];
};

export class ReferenceSalary1672
  implements IReferenceSalary<SupportedCc.IDCC1672>
{
  mapSituation(
    args: Record<string, string | undefined>
  ): ReferenceSalaryProps<SupportedCc.IDCC1672> {
    return {
      salaires: args.salaryPeriods
        ? (JSON.parse(args.salaryPeriods) as SalaryPeriods[])
        : [],
      salairesPendantPreavis: args.noticeSalaryPeriods
        ? JSON.parse(args.noticeSalaryPeriods)
        : [],
    };
  }

  computeReferenceSalary({
    salaires,
    salairesPendantPreavis,
  }: ReferenceSalaryProps<SupportedCc.IDCC1672>): number {
    const rankedSalaires = rankByMonthArrayDescFrench(salaires);
    const rankedSalairesPendantPreavis = rankByMonthArrayDescFrench(
      salairesPendantPreavis
    );

    const totalSalaryValues = [
      ...rankedSalairesPendantPreavis,
      ...rankedSalaires,
    ].slice(0, 12);

    return totalSalaryValues.reduce(
      (sref, current) => sref + (current.value ?? 0) + (current.prime ?? 0),
      0
    );
  }
}
