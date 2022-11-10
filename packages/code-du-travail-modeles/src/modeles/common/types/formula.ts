import type { LegalFormulaProps } from "../../base";
import type {
  Formula16Props,
  Formula44Props,
  Formula413Props,
  Formula573Props,
  Formula650Props,
  Formula1486Props,
  Formula1501Props,
  Formula1596Props,
  Formula1597Props,
  Formula2216Props,
  Formula2264Props,
  Formula3239Props,
} from "../../conventions";
import type { SupportedCcIndemniteLicenciement } from "..";

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

export type FormulaProps<T> = T extends SupportedCcIndemniteLicenciement.legal
  ? LegalFormulaProps
  : T extends SupportedCcIndemniteLicenciement.IDCC2264
  ? Formula2264Props
  : T extends SupportedCcIndemniteLicenciement.IDCC413
  ? Formula413Props
  : T extends SupportedCcIndemniteLicenciement.IDCC1596
  ? Formula1596Props
  : T extends SupportedCcIndemniteLicenciement.IDCC1597
  ? Formula1597Props
  : T extends SupportedCcIndemniteLicenciement.IDCC1486
  ? Formula1486Props
  : T extends SupportedCcIndemniteLicenciement.IDCC3239
  ? Formula3239Props
  : T extends SupportedCcIndemniteLicenciement.IDCC650
  ? Formula650Props
  : T extends SupportedCcIndemniteLicenciement.IDCC2216
  ? Formula2216Props
  : T extends SupportedCcIndemniteLicenciement.IDCC0016
  ? Formula16Props
  : T extends SupportedCcIndemniteLicenciement.IDCC0573
  ? Formula573Props
  : T extends SupportedCcIndemniteLicenciement.IDCC1501
  ? Formula1501Props
  : T extends SupportedCcIndemniteLicenciement.IDCC0044
  ? Formula44Props
  : DefaultFormulaProps;
