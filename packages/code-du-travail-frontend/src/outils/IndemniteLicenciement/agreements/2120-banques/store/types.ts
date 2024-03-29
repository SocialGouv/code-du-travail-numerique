import { StepData } from "../../../store";

export type Agreement2120StoreInput = {
  isLicenciementDisciplinaire?: boolean;
  salariesVariablePart?: number;
};

export type Agreement2120StoreError = {
  errorSalariesVariablePart?: string;
};

export type Agreement2120StoreData = StepData<
  Agreement2120StoreInput,
  Agreement2120StoreError
>;

export type Agreement2120StoreFn = {
  onChangeSalariesVariablePart: (value: string) => void;
  init: () => void;
};

export type Agreement2120StoreSlice = {
  agreement2120Data: Agreement2120StoreData;
  agreement2120Function: Agreement2120StoreFn;
};
