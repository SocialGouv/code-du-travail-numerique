import { SalaryPeriods } from "@socialgouv/modeles-social";
import { OuiNon } from "../../../common";
import { StepData } from "../../../store";
import { SalaryFieldError } from "../../../steps/Salaires/store/validator";

export type Agreement44StoreInput = {
  showVariablePay?: boolean;
  hasVariablePay?: OuiNon;
  showKnowingLastSalary?: boolean;
  lastMonthSalary?: SalaryPeriods;
  knowingLastSalary?: OuiNon;
  showLastMonthSalary?: boolean;
  sameDateNotificationDateSortie?: boolean;
};

export type Agreement44StoreError = {
  errorHasVariablePay?: string;
  errorKnowingLastSalary?: string;
  errorLastMonthSalary?: Record<string, SalaryFieldError | null>;
};

export type Agreement44StoreData = StepData<
  Agreement44StoreInput,
  Agreement44StoreError
>;

export type Agreement44StoreFn = {
  onInit: () => void;
  onChangeHasVariablePay: (value: OuiNon) => void;
  onChangeKnowingLastSalary: (value: OuiNon) => void;
  onChangeLastMonthSalary: (value: SalaryPeriods) => void;
};

export type Agreement44StoreSlice = {
  agreement44Data: Agreement44StoreData;
  agreement44Function: Agreement44StoreFn;
};
