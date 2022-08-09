import type { SupportedCcIndemniteLicenciement } from "..";
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
  : DefaultFormulaProps;
