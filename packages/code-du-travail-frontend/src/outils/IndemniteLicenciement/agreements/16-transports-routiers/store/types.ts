import { OuiNon } from "../../../common";
import { StepData } from "../../../store";

export type Agreement16StoreInput = {
  hasVariablePay?: OuiNon;
};

export type Agreement16StoreError = {
  errorHasVariablePay?: string;
};

export type Agreement16StoreData = StepData<
  Agreement16StoreInput,
  Agreement16StoreError
>;

export type Agreement16StoreFn = {
  onChangeHasVariablePay: (value: OuiNon) => void;
};

export type Agreement16StoreSlice = {
  agreement16Data: Agreement16StoreData;
  agreement16Function: Agreement16StoreFn;
};
