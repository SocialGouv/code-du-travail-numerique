import { StepData } from "../../../store";
import { OuiNon } from "../../../common/types";
import { SalaryPeriods } from "@socialgouv/modeles-social";

export type SalairesStoreInput = {
  hasTempsPartiel?: OuiNon;
  salaryPeriods: SalaryPeriods[];
  refSalary: number;
  agreementParameters?: Record<string, string | number>;
};

export type SalairesStoreError = {
  errorHasTempsPartiel?: string;
  errorTempsPartiel?: boolean;
  errorSalaryPeriods?: string;
  errorPrimes?: string;
};

export type SalairesStoreData = StepData<
  SalairesStoreInput,
  SalairesStoreError
>;

export type SalairesStoreFn = {
  initFieldSalaries: () => void;
  onChangeHasTempsPartiel: (value: OuiNon) => void;
  onSalariesChange: (value: SalaryPeriods[]) => void;
  onValidateStepSalaires: () => boolean;
};

export type SalairesStoreSlice = {
  salairesData: SalairesStoreData;
  salairesFunction: SalairesStoreFn;
};
