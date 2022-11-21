import type { SupportedCcIndemniteLicenciement } from "..";
import type { Formula16Props } from "./16_transports_routiers";
import type { Formula44Props } from "./44_industries_chimiques";
import type { Formula413Props } from "./413_handicap";
import type { Formula573Props } from "./573_commerces_de_gros";
import type { Formula650Props } from "./650_metallurgie_ingenieurs_cadres";
import type { Formula1596Props } from "./1596_batiment_employes_ouvriers";
import type { Formula1597Props } from "./1597_batiment_employes_ouvriers_bis";
import type { Formula2264Props } from "./2264_hospitalisation_privee";

export type DefaultFormulaProps = {
  seniority: number;
  refSalary: number;
};

export type Formula = {
  formula: string;
  explanations: string[];
};

export type CategoryPro16 =
  | "'Employés'"
  | "'Ingénieurs et cadres'"
  | "'Ouvriers'"
  | "'TAM'";

export interface IFormula<T extends SupportedCcIndemniteLicenciement> {
  computeFormula: (args: FormulaProps<T>) => Formula;
}

export type FormulaProps<T> =
  T extends SupportedCcIndemniteLicenciement.IDCC2264
    ? Formula2264Props
    : T extends SupportedCcIndemniteLicenciement.IDCC413
    ? Formula413Props
    : T extends SupportedCcIndemniteLicenciement.IDCC1596
    ? Formula1596Props
    : T extends SupportedCcIndemniteLicenciement.IDCC1597
    ? Formula1597Props
    : T extends SupportedCcIndemniteLicenciement.IDCC650
    ? Formula650Props
    : T extends SupportedCcIndemniteLicenciement.IDCC0016
    ? Formula16Props
    : T extends SupportedCcIndemniteLicenciement.IDCC0573
    ? Formula573Props
    : T extends SupportedCcIndemniteLicenciement.IDCC0044
    ? Formula44Props
    : DefaultFormulaProps;
