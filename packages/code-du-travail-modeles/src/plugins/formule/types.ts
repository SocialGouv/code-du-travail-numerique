import type { SupportedCcIndemniteLicenciement } from "..";
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

export type FormulaProps<T> = T extends SupportedCcIndemniteLicenciement.default
  ? LegalFormulaProps
  : DefaultFormulaProps;
