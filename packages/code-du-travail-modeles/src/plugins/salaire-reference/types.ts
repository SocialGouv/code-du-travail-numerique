import type { SupportedCcIndemniteLicenciement } from "..";
import type { CC16ReferenceSalaryProps } from "./16_transports_routiers";
import type { CC29ReferenceSalaryProps } from "./29-hospitalisation-privee-but-non-lucratif";
import type { CC44ReferenceSalaryProps } from "./44_industries_chimiques";
import type { CC573ReferenceSalaryProps } from "./573_commerces_de_gros";
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
    : T extends SupportedCcIndemniteLicenciement.IDCC0016
    ? CC16ReferenceSalaryProps
<<<<<<< HEAD
    : T extends SupportedCcIndemniteLicenciement.IDCC0044
    ? CC44ReferenceSalaryProps
=======
    : T extends SupportedCcIndemniteLicenciement.IDCC0573
    ? CC573ReferenceSalaryProps
>>>>>>> feat/indemnite-licenciement
    : T extends SupportedCcIndemniteLicenciement.IDCC0029
    ? CC29ReferenceSalaryProps
    : LegalReferenceSalaryProps;
