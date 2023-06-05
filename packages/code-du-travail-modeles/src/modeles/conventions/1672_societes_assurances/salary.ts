import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { nonNullable, rankByMonthArrayDescFrench } from "../../common";

export type CC1672ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  salairesPendantPreavis: SalaryPeriods[];
};

export class ReferenceSalary1672
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC1672>
{
  computeReferenceSalary({
    salaires,
    salairesPendantPreavis,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC1672>): number {
    const rankedSalaires = rankByMonthArrayDescFrench(salaires).filter((v) =>
      nonNullable(v.value)
    );
    const rankedSalairesPendantPreavis = rankByMonthArrayDescFrench(
      salairesPendantPreavis
    ).filter((v) => nonNullable(v.value));

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
