import { StepData } from "../../../store";
import { OuiNon } from "../../../common/types";
import { SalaryPeriods } from "@socialgouv/modeles-social";
import { ValidationResponse } from "../../../../Components/SimulatorLayout";

export type SalairesStoreInput = {
  hasTempsPartiel?: OuiNon;
  salaryPeriods: SalaryPeriods[];
  refSalary: number;
  hasSameSalary?: OuiNon;
  salary?: string;
  showHasTempsPartiel: boolean;
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
  onNextStep: (nextStepName?: string) => ValidationResponse;
  onChangeHasSameSalary: (value: OuiNon) => void;
  onChangeSalary: (value: string) => void;
  initShowHasTempsPartiel: () => void;
};

export type SalairesStoreSlice = {
  salairesData: SalairesStoreData;
  salairesFunction: SalairesStoreFn;
};
