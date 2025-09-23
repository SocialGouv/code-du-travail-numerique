import { SalaryPeriods } from "@socialgouv/modeles-social";
import { OuiNon } from "../../../common";
import { StepData } from "../../../store";
import { SalaryFieldError } from "../../../steps/Salaires/store/validator";

export type Agreement1483StoreInput = {
  hasReceivedSalaries?: OuiNon;
  noticeSalaryPeriods?: SalaryPeriods[];
  noticePeriodsMoreThan3Months?: boolean;
};

export type Agreement1483StoreError = {
  errorHasReceivedSalaries?: string;
  errorNoticeSalaryPeriods?: Record<string, SalaryFieldError | null>;
};

export type Agreement1483StoreData = StepData<
  Agreement1483StoreInput,
  Agreement1483StoreError
>;

export type Agreement1483StoreFn = {
  onSalariesChange: (value: SalaryPeriods[]) => void;
  onChangeHasReceivedSalaries: (value: OuiNon) => void;
  onInit: () => void;
};

export type Agreement1483StoreSlice = {
  agreement1483Data: Agreement1483StoreData;
  agreement1483Function: Agreement1483StoreFn;
};
