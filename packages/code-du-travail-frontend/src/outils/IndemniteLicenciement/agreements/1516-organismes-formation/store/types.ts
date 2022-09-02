import { SalaryPeriods } from "@socialgouv/modeles-social";
import { OuiNon } from "../../../common";
import { StepData } from "../../../store";

export type Agreement1516StoreInput = {
  hasReceivedSalaries?: OuiNon;
  salaryPeriods?: SalaryPeriods[];
};

export type Agreement1516StoreError = {
  errorHasReceivedSalaries?: string;
  errorSalaryPeriods?: string;
};

export type Agreement1516StoreData = StepData<
  Agreement1516StoreInput,
  Agreement1516StoreError
>;

export type Agreement1516StoreFn = {
  onSalariesChange: (value: SalaryPeriods[]) => void;
  onChangeHasReceivedSalaries: (value: OuiNon) => void;
  initSalaryPeriods: (withDefaultSalaryPeriod: boolean) => void;
};

export type Agreement1516StoreSlice = {
  agreement1516Data: Agreement1516StoreData;
  agreement1516Function: Agreement1516StoreFn;
};
