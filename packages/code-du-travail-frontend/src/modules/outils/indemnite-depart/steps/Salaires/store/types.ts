import { StepData } from "../../../store";
import { OuiNon } from "../../../common/types";
import { SalaryPeriods } from "@socialgouv/modeles-social";
import { ValidationResponse } from "src/modules/outils/common/types";

export type SalairesStoreInput = {
  hasTempsPartiel?: OuiNon;
  salaryPeriods: SalaryPeriods[];
  hasSameSalary?: OuiNon;
  salary?: string;
  showHasTempsPartiel: boolean;
};

export enum SalaryErrorType {
  REQUIRED = "REQUIRED",
  INVALID_NUMBER = "INVALID_NUMBER",
  NEGATIVE_VALUE = "NEGATIVE_VALUE",
  ZERO_VALUE = "ZERO_VALUE",
}

export type SalaryFieldError = {
  type: SalaryErrorType;
  message: string;
};

export type SalairesStoreError = {
  errorHasTempsPartiel?: string;
  errorHasSameSalary?: string;
  errorSalary?: string;
  errorTempsPartiel?: boolean;
  errorSalaryPeriods?: Record<string, SalaryFieldError | null>;
  errorPrimes?: Record<string, SalaryFieldError | null>;
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
