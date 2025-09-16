import { SalaryPeriods } from "@socialgouv/modeles-social";
import { OuiNon } from "../../../common";
import { StepData } from "../../../store";
import type { SalaryFieldError } from "../../../steps/Salaires/store/validator";

export type Agreement1702StoreInput = {
  hasReceivedSalaries?: OuiNon;
  noticeSalaryPeriods?: SalaryPeriods[];
};

export type Agreement1702StoreError = {
  errorHasReceivedSalaries?: string;
  errorNoticeSalaryPeriods?: Record<string, SalaryFieldError | null>;
};

export type Agreement1702StoreData = StepData<
  Agreement1702StoreInput,
  Agreement1702StoreError
>;

export type Agreement1702StoreFn = {
  onSalariesChange: (value: SalaryPeriods[]) => void;
  onChangeHasReceivedSalaries: (value: OuiNon) => void;
  onInit: () => void;
};

export type Agreement1702StoreSlice = {
  agreement1702Data: Agreement1702StoreData;
  agreement1702Function: Agreement1702StoreFn;
};
