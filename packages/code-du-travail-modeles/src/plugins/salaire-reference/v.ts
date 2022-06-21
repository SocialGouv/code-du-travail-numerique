import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SupportedCcIndemniteLicenciement,
} from "./types";

export class ReferenceSalaryV
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCCV>
{
  computeReferenceSalary({
    sisi,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCCV>): number {
    console.log(sisi);

    return 0;
  }
}
