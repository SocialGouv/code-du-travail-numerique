import type { SupportedCcIndemniteLicenciement } from "..";
import type { Formula413Props } from "./413_handicap";
import type { Formula1597Props } from "./1597_batiment_employes_ouvriers_bis";
import type { Formula2264Props } from "./2264_hospitalisation_privee";
import type { LegalFormulaProps } from "./legal";

export type DefaultFormulaProps = {
  seniority: number;
  refSalary: number;
};

export type Formula = {
  formula: string;
  explanations: string[];
};

export interface IFormula<T extends SupportedCcIndemniteLicenciement> {
  computeFormula: (args: FormulaProps<T>) => Formula;
}

export type FormulaProps<T> = T extends SupportedCcIndemniteLicenciement.legal
  ? LegalFormulaProps
  : T extends SupportedCcIndemniteLicenciement.IDCC2264
  ? Formula2264Props
  : T extends SupportedCcIndemniteLicenciement.IDCC413
  ? Formula413Props
  : T extends SupportedCcIndemniteLicenciement.IDCC1597
  ? Formula1597Props
  : DefaultFormulaProps;
