import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../common";

export type CC2906ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  hasVariablePay: boolean;
};

export class ReferenceSalary2609
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC2609>
{
  computeReferenceSalary({
    hasVariablePay,
    salaires,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC2609>): number {
    const rankedSalaries = rankByMonthArrayDescFrench(salaires);
    const salaryValues = rankedSalaries.map((a) => a.value).filter(nonNullable);
    const lastSalary = salaryValues.length > 0 ? salaryValues[0] : 0;
    if (!hasVariablePay) {
      return lastSalary;
    }

    return lastSalary + (1 / 12) * sum(salaryValues);
  }
}
