import { StepData } from "../../../store";
import { OuiNon } from "../../../common/types";
import { SalaryPeriods } from "@socialgouv/modeles-social";

export type SalairesStoreInput = {
  hasTempsPartiel?: OuiNon;
  salaryPeriods: SalaryPeriods[];
  refSalary: number;
  agreementRefSalary?: number;
  hasSameSalary?: OuiNon;
  salary?: string;
};

export type SalairesStoreError = {
  errorHasTempsPartiel?: string;
  errorHasSameSalary?: string;
  errorSalary?: string;
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
  onChangeHasSameSalary: (value: OuiNon) => void;
  onChangeSalary: (value: string) => void;
};

export type SalairesStoreSlice = {
  salairesData: SalairesStoreData;
  salairesFunction: SalairesStoreFn;
};
