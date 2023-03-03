import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SupportedCcIndemniteLicenciement,
} from "../../common";

export class ReferenceSalary1672
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC1672>
{
  computeReferenceSalary(
    props: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC1672>
  ): number {
    if (props.salaires.length === 0) {
      return 0;
    }

    return props.salaires.reduce(
      (sref, current) => sref + (current.value ?? 0) + (current.prime ?? 0),
      0
    );
  }
}
