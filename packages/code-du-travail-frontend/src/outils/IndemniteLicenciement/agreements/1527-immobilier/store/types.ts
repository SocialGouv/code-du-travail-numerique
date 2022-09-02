import { OuiNon } from "../../../common";
import { StepData } from "../../../store";

export type Agreement1527StoreInput = {
  hasContractSalary?: OuiNon;
  contractSalary?: string;
};

export type Agreement1527StoreError = {
  errorHasContractSalary?: string;
  errorContractSalary?: string;
};

export type Agreement1527StoreData = StepData<
  Agreement1527StoreInput,
  Agreement1527StoreError
>;

export type Agreement1527StoreFn = {
  onChangeContractSalary: (value: string) => void;
  onChangeHasContractSalary: (value: OuiNon) => void;
};

export type Agreement1527StoreSlice = {
  agreement1527Data: Agreement1527StoreData;
  agreement1527Function: Agreement1527StoreFn;
};
