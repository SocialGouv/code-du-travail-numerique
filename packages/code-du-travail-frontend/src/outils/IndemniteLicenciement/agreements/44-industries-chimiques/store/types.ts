import { OuiNon } from "../../../common";
import { StepData } from "../../../store";

export type Agreement44StoreInput = {
  showVariablePay?: boolean;
  hasVariablePay?: OuiNon;
};

export type Agreement44StoreError = {
  errorHasVariablePay?: string;
};

export type Agreement44StoreData = StepData<
  Agreement44StoreInput,
  Agreement44StoreError
>;

export type Agreement44StoreFn = {
  onInit: () => void;
  onChangeHasVariablePay: (value: OuiNon) => void;
};

export type Agreement44StoreSlice = {
  agreement44Data: Agreement44StoreData;
  agreement44Function: Agreement44StoreFn;
};
