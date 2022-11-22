import { ReferenceSalaryLegal } from "../../base";
import type {
  CategoryPro16,
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../common";

export type CC16ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  category: CategoryPro16;
  hasVariablePay: boolean;
  driveInability?: "definitive" | "temporary";
};

export class ReferenceSalary16
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC0016>
{
  computeReferenceSalary(
    props: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC0016>
  ): number {
    if (props.salaires.length === 0) {
      return 0;
    }
    switch (props.category) {
      case "'Employés'":
        return this.computeThreeLastMonthsAverage(props);
      case "'TAM'":
      case "'Ingénieurs et cadres'":
        return this.computeReferenceSalaryDependsOnVariable(props);
      case "'Ouvriers'":
        switch (props.driveInability) {
          case undefined:
          case "definitive":
            return this.computeThreeLastMonthsAverage(props);
          case "temporary":
            return new ReferenceSalaryLegal().computeReferenceSalary(props);
        }
    }
  }

  private computeReferenceSalaryDependsOnVariable({
    salaires,
    hasVariablePay,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC0016>): number {
    const rankedSalaries = rankByMonthArrayDescFrench(salaires);
    if (hasVariablePay) {
      const salaries = rankedSalaries.map((a) => a.value).filter(nonNullable);

      return sum(salaries) / salaires.length;
    } else {
      return rankedSalaries[0]?.value ?? 0;
    }
  }

  private computeThreeLastMonthsAverage({
    salaires,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC0016>): number {
    const rankedSalaries = rankByMonthArrayDescFrench(salaires);
    const lastThreeSalaries = rankedSalaries
      .slice(0, 3)
      .map((a) => a.value)
      .filter(nonNullable);

    return sum(lastThreeSalaries) / lastThreeSalaries.length;
  }
}
