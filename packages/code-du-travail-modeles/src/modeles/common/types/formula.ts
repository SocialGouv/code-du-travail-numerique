import type {
  Formula44Props,
  Formula573Props,
  Formula650Props,
  Formula1596Props,
} from "../../conventions";
import type { SupportedCcIndemniteLicenciement } from "..";

export type DefaultFormulaProps = {
  seniority: number;
  refSalary: number;
};

export type Formula = {
  formula: string;
  explanations: string[];
  annotations?: string[];
};

export type CategoryPro16 =
  | "'Employés'"
  | "'Ingénieurs et cadres'"
  | "'Ouvriers'"
  | "'TAM'";

export interface IFormula<T extends SupportedCcIndemniteLicenciement> {
  computeFormula: (args: FormulaProps<T>) => Formula;
}

export type FormulaProps<
  T
> = T extends SupportedCcIndemniteLicenciement.IDCC1596
  ? Formula1596Props
  : T extends SupportedCcIndemniteLicenciement.IDCC650
  ? Formula650Props
  : T extends SupportedCcIndemniteLicenciement.IDCC0573
  ? Formula573Props
  : T extends SupportedCcIndemniteLicenciement.IDCC0044
  ? Formula44Props
  : DefaultFormulaProps;
