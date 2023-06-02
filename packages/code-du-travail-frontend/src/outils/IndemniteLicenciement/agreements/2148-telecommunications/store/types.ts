import { SalaryPeriods } from "@socialgouv/modeles-social";
import { OuiNon } from "../../../common";
import { StepData } from "../../../store";

export type Agreement2148StoreInput = {
  hasReceivedSalaries?: OuiNon;
  noticeSalaryPeriods?: SalaryPeriods[];
};

export type Agreement2148StoreError = {
  errorHasReceivedSalaries?: string;
  errorNoticeSalaryPeriods?: string;
};

export type Agreement2148StoreData = StepData<
  Agreement2148StoreInput,
  Agreement2148StoreError
>;

export type Agreement2148StoreFn = {
  onSalariesChange: (value: SalaryPeriods[]) => void;
  onChangeHasReceivedSalaries: (value: OuiNon) => void;
  onInit: () => void;
};

export type Agreement2148StoreSlice = {
  agreement2148Data: Agreement2148StoreData;
  agreement2148Function: Agreement2148StoreFn;
};
