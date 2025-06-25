import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { SalaryInfo } from "../../../types";

export type RemunerationStoreInput = {
  salaryInfo: SalaryInfo;
};

export type RemunerationStoreError = {
  monthlySalary?: string;
  variablePart?: string;
  benefits?: string;
};

export type RemunerationStoreData = {
  input: RemunerationStoreInput;
  error: RemunerationStoreError;
  hasBeenSubmit: boolean;
  isStepValid: boolean;
};

export type RemunerationStoreFn = {
  onSalaryInfoChange: (salaryInfo: SalaryInfo) => void;
  onNextStep: () => ValidationResponse;
};

export type RemunerationStoreSlice = {
  remunerationData: RemunerationStoreData;
  remunerationFunction: RemunerationStoreFn;
};
