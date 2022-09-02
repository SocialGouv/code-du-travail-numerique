import type { SupportedCcIndemniteLicenciement } from "..";
import type { CC1516ReferenceSalaryProps } from "./1516_organismes_formation";
import type { CC1527ReferenceSalaryProps } from "./1527-immobilier";
import type { LegalReferenceSalaryProps } from "./legal";

export type SalaryPeriods = {
  month: string;
  value?: number;
  prime?: number;
};

export interface IReferenceSalary<T extends SupportedCcIndemniteLicenciement> {
  computeReferenceSalary: (args: ReferenceSalaryProps<T>) => number;
}

export type ReferenceSalaryProps<T> =
  T extends SupportedCcIndemniteLicenciement.IDCC1516
    ? CC1516ReferenceSalaryProps
    : T extends SupportedCcIndemniteLicenciement.IDCC1527
    ? CC1527ReferenceSalaryProps
    : LegalReferenceSalaryProps;
