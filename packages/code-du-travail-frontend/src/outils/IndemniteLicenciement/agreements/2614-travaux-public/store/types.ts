import { OuiNon } from "../../../common";
import { StepData } from "../../../store";

export type Agreement2614StoreInput = {
  hasVariablePay?: OuiNon;
};

export type Agreement2614StoreError = {
  errorHasVariablePay?: string;
};

export type Agreement2614StoreData = StepData<
  Agreement2614StoreInput,
  Agreement2614StoreError
>;

export type Agreement2614StoreFn = {
  onChangeHasVariablePay: (value: OuiNon) => void;
};

export type Agreement2614StoreSlice = {
  agreement2614Data: Agreement2614StoreData;
  agreement2614Function: Agreement2614StoreFn;
};
