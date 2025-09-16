import { SalaryPeriods } from "@socialgouv/modeles-social";
import { OuiNon } from "../../../common";
import { StepData } from "../../../store";
import type { SalaryFieldError } from "../../../steps/Salaires/store/validator";

export type Agreement1672StoreInput = {
  hasReceivedSalaries?: OuiNon;
  noticeSalaryPeriods?: SalaryPeriods[];
};

export type Agreement1672StoreError = {
  errorHasReceivedSalaries?: string;
  errorNoticeSalaryPeriods?: Record<string, SalaryFieldError | null>;
};

export type Agreement1672StoreData = StepData<
  Agreement1672StoreInput,
  Agreement1672StoreError
>;

export type Agreement1672StoreFn = {
  onSalariesChange: (value: SalaryPeriods[]) => void;
  onChangeHasReceivedSalaries: (value: OuiNon) => void;
  onInit: () => void;
};

export type Agreement1672StoreSlice = {
  agreement1672Data: Agreement1672StoreData;
  agreement1672Function: Agreement1672StoreFn;
};
