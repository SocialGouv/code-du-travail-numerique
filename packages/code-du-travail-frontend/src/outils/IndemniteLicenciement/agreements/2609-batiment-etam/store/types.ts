import { OuiNon } from "../../../common";
import { StepData } from "../../../store";

export type Agreement2609StoreInput = {
  hasVariablePay?: OuiNon;
};

export type Agreement2609StoreError = {
  errorHasVariablePay?: string;
};

export type Agreement2609StoreData = StepData<
  Agreement2609StoreInput,
  Agreement2609StoreError
>;

export type Agreement2609StoreFn = {
  onChangeHasVariablePay: (value: OuiNon) => void;
};

export type Agreement2609StoreSlice = {
  agreement2609Data: Agreement2609StoreData;
  agreement2609Function: Agreement2609StoreFn;
};
