import type { SupportedCcIndemniteLicenciement } from "..";
import type { CC650ReferenceSalaryProps } from "./650_metallurgie_ingenieurs_cadres";
import type { CC1486ReferenceSalaryProps } from "./1486_bureaux_etudes_techniques";
import type { CC1516ReferenceSalaryProps } from "./1516_organismes_formation";
import type { CC1527ReferenceSalaryProps } from "./1527-immobilier";
import type { CC3239ReferenceSalaryProps } from "./3239_particuliers_employeurs_domicile";
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
    : T extends SupportedCcIndemniteLicenciement.IDCC1527
    ? CC1527ReferenceSalaryProps
    : T extends SupportedCcIndemniteLicenciement.IDCC3239
    ? CC3239ReferenceSalaryProps
    : T extends SupportedCcIndemniteLicenciement.IDCC650
    ? CC650ReferenceSalaryProps
    : LegalReferenceSalaryProps;
