import type { SupportedCcIndemniteLicenciement } from "..";
import type { CC1486ReferenceSalaryProps } from "./1486_bureaux_etudes_techniques";
import type { CC1516ReferenceSalaryProps } from "./1516_organismes_formation";
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
    : T extends SupportedCcIndemniteLicenciement.IDCC1486
    ? CC1486ReferenceSalaryProps
    : LegalReferenceSalaryProps;
