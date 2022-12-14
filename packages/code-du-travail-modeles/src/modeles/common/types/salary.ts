import type { LegalReferenceSalaryProps } from "../../base";
import type {
  CC1486ReferenceSalaryProps,
  CC1516ReferenceSalaryProps,
  CC1527ReferenceSalaryProps,
  CC16ReferenceSalaryProps,
  CC2098ReferenceSalaryProps,
  CC29ReferenceSalaryProps,
  CC3239ReferenceSalaryProps,
  CC44ReferenceSalaryProps,
  CC573ReferenceSalaryProps,
} from "../../conventions";
import type { SupportedCcIndemniteLicenciement } from "..";

export type SalaryPeriods = {
  month: string;
  value?: number;
  prime?: number;
};

export interface IReferenceSalary<T extends SupportedCcIndemniteLicenciement> {
  computeReferenceSalary: (args: ReferenceSalaryProps<T>) => number;
}

export type ReferenceSalaryProps<
  T
> = T extends SupportedCcIndemniteLicenciement.IDCC1516
  ? CC1516ReferenceSalaryProps
  : T extends SupportedCcIndemniteLicenciement.IDCC1486
  ? CC1486ReferenceSalaryProps
  : T extends SupportedCcIndemniteLicenciement.IDCC1527
  ? CC1527ReferenceSalaryProps
  : T extends SupportedCcIndemniteLicenciement.IDCC3239
  ? CC3239ReferenceSalaryProps
  : T extends SupportedCcIndemniteLicenciement.IDCC0016
  ? CC16ReferenceSalaryProps
  : T extends SupportedCcIndemniteLicenciement.IDCC0044
  ? CC44ReferenceSalaryProps
  : T extends SupportedCcIndemniteLicenciement.IDCC0573
  ? CC573ReferenceSalaryProps
  : T extends SupportedCcIndemniteLicenciement.IDCC0029
  ? CC29ReferenceSalaryProps
  : T extends SupportedCcIndemniteLicenciement.IDCC2098
  ? CC2098ReferenceSalaryProps
  : LegalReferenceSalaryProps;
