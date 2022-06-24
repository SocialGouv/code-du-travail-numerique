import { OuiNon } from "../../../common";
import { Prime } from "../../../steps/Salaires/components/Primes";
import { SalaryPeriods } from "../../../steps/Salaires/components/SalaireTempsPlein";
import { StepData } from "../../../store";

export type Agreement1516StoreInput = {
  hasReceivedSalaries?: OuiNon;
  salaryPeriods: SalaryPeriods[];
  hasReceivedPrimes?: OuiNon;
  primes: Prime[];
};

export type Agreement1516StoreError = {
  errorHasReceivedSalaries?: string;
  errorHasReceivedPrimes?: string;
  errorSalaryPeriods?: string;
  errorPrimes?: string;
};

export type Agreement1516StoreData = StepData<
  Agreement1516StoreInput,
  Agreement1516StoreError
>;

export type Agreement1516StoreFn = {
  onSalariesChange: (value: SalaryPeriods[]) => void;
  onChangeHasReceivedSalaries: (value: OuiNon) => void;
  onChangeHasReceivedPrimes: (value: OuiNon) => void;
  onChangePrimes: (primes: Prime[]) => void;
};

export type Agreement1516StoreSlice = {
  agreement1516Data: Agreement1516StoreData;
  agreement1516Function: Agreement1516StoreFn;
};
