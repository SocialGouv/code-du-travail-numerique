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
import type { SupportedCc } from "..";

export type SalaryPeriods = {
  month: string;
  value?: number;
  prime?: number;
};

export interface IReferenceSalary<T extends SupportedCc> {
  computeReferenceSalary: (args: ReferenceSalaryProps<T>) => number;
  computeExtraInfo?: (
    args: ReferenceSalaryProps<T>
  ) => Record<string, number | string>;
  mapSituation?: (
    args: Record<string, string | undefined>
  ) => ReferenceSalaryProps<T>;
}

export type ReferenceSalaryProps<T> = T extends SupportedCc.IDCC0016
  ? CC16ReferenceSalaryProps
  : T extends SupportedCc.IDCC0029
  ? CC29ReferenceSalaryProps
  : T extends SupportedCc.IDCC0044
  ? CC44ReferenceSalaryProps
  : T extends SupportedCc.IDCC0573
  ? CC573ReferenceSalaryProps
  : T extends SupportedCc.IDCC1486
  ? CC1486ReferenceSalaryProps
  : T extends SupportedCc.IDCC1516
  ? CC1516ReferenceSalaryProps
  : T extends SupportedCc.IDCC1527
  ? CC1527ReferenceSalaryProps
  : T extends SupportedCc.IDCC2098
  ? CC2098ReferenceSalaryProps
  : T extends SupportedCc.IDCC2596
  ? CC2596ReferenceSalaryProps
  : T extends SupportedCc.IDCC2609
  ? CC2609ReferenceSalaryProps
  : T extends SupportedCc.IDCC2148
  ? CC2148ReferenceSalaryProps
  : T extends SupportedCc.IDCC2614
  ? CC2614ReferenceSalaryProps
  : T extends SupportedCc.IDCC3239
  ? CC3239ReferenceSalaryProps
  : T extends SupportedCc.IDCC0675
  ? CC675ReferenceSalaryProps
  : T extends SupportedCc.IDCC1672
  ? CC1672ReferenceSalaryProps
  : T extends SupportedCc.IDCC1483
  ? CC1483ReferenceSalaryProps
  : T extends SupportedCc.IDCC1702
  ? CC1702ReferenceSalaryProps
  : T extends SupportedCc.IDCC1740
  ? CC1740ReferenceSalaryProps
  : T extends SupportedCc.IDCC2120
  ? CC2120ReferenceSalaryProps
  : LegalReferenceSalaryProps;
