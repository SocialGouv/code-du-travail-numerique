import { StepData } from "../../../store";
import { OuiNon, Prime, SalaryPeriods } from "../../../common/types";

export type SalairesStoreInput = {
  hasTempsPartiel?: OuiNon;
  salaryPeriods: SalaryPeriods[];
  primes: Prime[];
};

export type SalairesStoreError = {
  errorHasTempsPartiel?: string;
  errorTempsPartiel?: boolean;
  errorSalaryPeriods?: string;
  errorPrimes?: string;
};

export type SalairesStoreData = StepData<
  SalairesStoreInput,
  SalairesStoreError
>;

export type SalairesStoreFn = {
  initFieldSalaries: () => void;
  onChangeHasTempsPartiel: (value: OuiNon) => void;
  onSalariesChange: (value: SalaryPeriods[]) => void;
  onChangePrimes: (primes: Prime[]) => void;
  onValidateStepSalaires: () => boolean;
};

export type SalairesStoreSlice = {
  salairesData: SalairesStoreData;
  salairesFunction: SalairesStoreFn;
};
