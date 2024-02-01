import type { LegalReferenceSalaryProps } from "../../base";
import type {
  CC16ReferenceSalaryProps,
  CC29ReferenceSalaryProps,
  CC44ReferenceSalaryProps,
  CC573ReferenceSalaryProps,
  CC675ReferenceSalaryProps,
  CC1483ReferenceSalaryProps,
  CC1486ReferenceSalaryProps,
  CC1516ReferenceSalaryProps,
  CC1527ReferenceSalaryProps,
  CC1672ReferenceSalaryProps,
  CC1702ReferenceSalaryProps,
  CC1740ReferenceSalaryProps,
  CC2098ReferenceSalaryProps,
  CC2120ReferenceSalaryProps,
  CC2148ReferenceSalaryProps,
  CC2596ReferenceSalaryProps,
  CC2609ReferenceSalaryProps,
  CC2614ReferenceSalaryProps,
  CC3239ReferenceSalaryProps,
} from "../../conventions";
import type { SupportedCcIndemniteLicenciement } from "..";

export type SalaryPeriods = {
  month: string;
  value?: number;
  prime?: number;
};

export interface IReferenceSalary<T extends SupportedCcIndemniteLicenciement> {
  computeReferenceSalary: (args: ReferenceSalaryProps<T>) => number;
  computeExtraInfo?: (
    args: ReferenceSalaryProps<T>
  ) => Record<string, number | string>;
  mapSituation?: (
    args: Record<string, string | undefined>
  ) => ReferenceSalaryProps<T>;
}

export type ReferenceSalaryProps<T> =
  T extends SupportedCcIndemniteLicenciement.IDCC0016
    ? CC16ReferenceSalaryProps
    : T extends SupportedCcIndemniteLicenciement.IDCC0029
    ? CC29ReferenceSalaryProps
    : T extends SupportedCcIndemniteLicenciement.IDCC0044
    ? CC44ReferenceSalaryProps
    : T extends SupportedCcIndemniteLicenciement.IDCC0573
    ? CC573ReferenceSalaryProps
    : T extends SupportedCcIndemniteLicenciement.IDCC1486
    ? CC1486ReferenceSalaryProps
    : T extends SupportedCcIndemniteLicenciement.IDCC1516
    ? CC1516ReferenceSalaryProps
    : T extends SupportedCcIndemniteLicenciement.IDCC1527
    ? CC1527ReferenceSalaryProps
    : T extends SupportedCcIndemniteLicenciement.IDCC2098
    ? CC2098ReferenceSalaryProps
    : T extends SupportedCcIndemniteLicenciement.IDCC2596
    ? CC2596ReferenceSalaryProps
    : T extends SupportedCcIndemniteLicenciement.IDCC2609
    ? CC2609ReferenceSalaryProps
    : T extends SupportedCcIndemniteLicenciement.IDCC2148
    ? CC2148ReferenceSalaryProps
    : T extends SupportedCcIndemniteLicenciement.IDCC2614
    ? CC2614ReferenceSalaryProps
    : T extends SupportedCcIndemniteLicenciement.IDCC3239
    ? CC3239ReferenceSalaryProps
    : T extends SupportedCcIndemniteLicenciement.IDCC0675
    ? CC675ReferenceSalaryProps
    : T extends SupportedCcIndemniteLicenciement.IDCC1672
    ? CC1672ReferenceSalaryProps
    : T extends SupportedCcIndemniteLicenciement.IDCC1483
    ? CC1483ReferenceSalaryProps
    : T extends SupportedCcIndemniteLicenciement.IDCC1702
    ? CC1702ReferenceSalaryProps
    : T extends SupportedCcIndemniteLicenciement.IDCC1740
    ? CC1740ReferenceSalaryProps
    : T extends SupportedCcIndemniteLicenciement.IDCC2120
    ? CC2120ReferenceSalaryProps
    : LegalReferenceSalaryProps;
