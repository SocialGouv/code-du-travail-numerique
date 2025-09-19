import { SalaryPeriods } from "@socialgouv/modeles-social";
import { OuiNon } from "../../../common";
import { StepData } from "../../../store";
import { SalaryFieldError } from "../../../steps/Salaires/store/validator";

export type Agreement1740StoreInput = {
  hasReceivedSalaries?: OuiNon;
  noticeSalaryPeriods?: SalaryPeriods[];
};

export type Agreement1740StoreError = {
  errorHasReceivedSalaries?: string;
  errorNoticeSalaryPeriods?: Record<string, SalaryFieldError | null>;
};

export type Agreement1740StoreData = StepData<
  Agreement1740StoreInput,
  Agreement1740StoreError
>;

export type Agreement1740StoreFn = {
  onSalariesChange: (value: SalaryPeriods[]) => void;
  onChangeHasReceivedSalaries: (value: OuiNon) => void;
  onInit: () => void;
};

export type Agreement1740StoreSlice = {
  agreement1740Data: Agreement1740StoreData;
  agreement1740Function: Agreement1740StoreFn;
};
