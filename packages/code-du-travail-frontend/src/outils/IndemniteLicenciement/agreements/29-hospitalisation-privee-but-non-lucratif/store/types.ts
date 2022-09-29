import { OuiNon } from "../../../common";
import { StepData } from "../../../store";

export type Agreement29StoreInput = {
  hasSixBestSalaries?: OuiNon;
  sixBestSalariesTotal?: string;
};

export type Agreement29StoreError = {
  errorHasSixBestSalaries?: string;
  errorSixBestSalariesTotal?: string;
};

export type Agreement29StoreData = StepData<
  Agreement29StoreInput,
  Agreement29StoreError
>;

export type Agreement29StoreFn = {
  onChangeSixBestSalariesTotal: (value: string) => void;
  onChangeHasSixBestSalaries: (value: OuiNon) => void;
};

export type Agreement29StoreSlice = {
  agreement29Data: Agreement29StoreData;
  agreement29Function: Agreement29StoreFn;
};
