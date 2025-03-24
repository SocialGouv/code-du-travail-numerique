import { SalaryPeriods } from "@socialgouv/modeles-social";
import { OuiNon } from "../../../common";
import { StepData } from "../../../store";

export type Agreement1516StoreInput = {
  hasReceivedSalaries?: OuiNon;
  noticeSalaryPeriods?: SalaryPeriods[];
  noticePeriodsMoreThan3Months?: boolean;
};

export type Agreement1516StoreError = {
  errorHasReceivedSalaries?: string;
  errorNoticeSalaryPeriods?: string;
};

export type Agreement1516StoreData = StepData<
  Agreement1516StoreInput,
  Agreement1516StoreError
>;

export type Agreement1516StoreFn = {
  onSalariesChange: (value: SalaryPeriods[]) => void;
  onChangeHasReceivedSalaries: (value: OuiNon) => void;
  onInit: () => void;
};

export type Agreement1516StoreSlice = {
  agreement1516Data: Agreement1516StoreData;
  agreement1516Function: Agreement1516StoreFn;
};
