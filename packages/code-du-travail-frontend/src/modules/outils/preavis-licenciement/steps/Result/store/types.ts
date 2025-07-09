export type ResultStoreInput = {
  result?: any;
  calculatedData?: any;
};

export type ResultStoreError = {
  result?: string;
};

export type StepData<Input, Error> = {
  input: Input;
  error: Error;
  hasBeenSubmit: boolean;
  isStepValid: boolean;
};

export type ResultStoreData = StepData<ResultStoreInput, ResultStoreError> & {
  publicodes: any;
};

export type ResultStoreFunction = {
  calculateResult: () => void;
  resetStep: () => void;
};

export type ResultStoreSlice = {
  resultData: ResultStoreData;
  resultFunction: ResultStoreFunction;
};
