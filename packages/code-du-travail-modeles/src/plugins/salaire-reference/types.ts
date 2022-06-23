import type { CC1516ReferenceSalaryProps } from "./1516_organismes_formation";
import type { LegalReferenceSalaryProps } from "./legal";

export interface IReferenceSalary<T extends SupportedCcIndemniteLicenciement> {
  computeReferenceSalary: (args: ReferenceSalaryProps<T>) => number;
}

export enum SupportedCcIndemniteLicenciement {
  IDCC1516 = "IDCC1516",
  default = "default",
}

export type ReferenceSalaryProps<T> =
  T extends SupportedCcIndemniteLicenciement.IDCC1516
    ? CC1516ReferenceSalaryProps
    : LegalReferenceSalaryProps;
