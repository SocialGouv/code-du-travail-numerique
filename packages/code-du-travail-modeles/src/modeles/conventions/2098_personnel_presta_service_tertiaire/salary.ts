import { ReferenceSalaryLegal } from "../../base";
import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCc,
} from "../../common";
import { nonNullable, sum } from "../../common";

export type CategoryPro2098 = "'Cadres'" | "'Non-cadres'";

export type CC2098ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  category: CategoryPro2098;
  inabilityNonProfessional: boolean;
};

export class ReferenceSalary2098
  implements IReferenceSalary<SupportedCc.IDCC2098>
{
  computeReferenceSalary(
    props: ReferenceSalaryProps<SupportedCc.IDCC2098>
  ): number {
    if (props.salaires.length === 0) {
      return 0;
    }
    if (props.inabilityNonProfessional || props.category === "'Non-cadres'") {
      return new ReferenceSalaryLegal().computeReferenceSalary(props);
    }

    const salaryValues = props.salaires.map((a) => a.value).filter(nonNullable);
    return sum(salaryValues) / props.salaires.length;
  }
}
