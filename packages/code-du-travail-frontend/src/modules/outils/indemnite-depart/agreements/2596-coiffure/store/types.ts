import { SalaryPeriods } from "@socialgouv/modeles-social";
import { OuiNon } from "../../../common";
import { StepData } from "../../../store";
import type { SalaryFieldError } from "../../../steps/Salaires/store/validator";

export type Agreement2596StoreInput = {
  hasReceivedSalaries?: OuiNon;
  noticeSalaryPeriods?: SalaryPeriods[];
};

export type Agreement2596StoreError = {
  errorHasReceivedSalaries?: string;
  errorNoticeSalaryPeriods?: Record<string, SalaryFieldError | null>;
};

export type Agreement2596StoreData = StepData<
  Agreement2596StoreInput,
  Agreement2596StoreError
>;

export type Agreement2596StoreFn = {
  onSalariesChange: (value: SalaryPeriods[]) => void;
  onChangeHasReceivedSalaries: (value: OuiNon) => void;
  onInit: () => void;
};

export type Agreement2596StoreSlice = {
  agreement2596Data: Agreement2596StoreData;
  agreement2596Function: Agreement2596StoreFn;
};
