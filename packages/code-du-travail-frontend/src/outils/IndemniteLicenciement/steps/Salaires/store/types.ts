import { StepData } from "../../../store";
import { Prime } from "../components/Primes";
import { SalaryPeriods } from "../components/SalaireTempsPlein";
import { OuiNon } from "../../../common/types";

export type SalairesStoreInput = {
  hasBeenInit?: OuiNon;
  hasTempsPartiel?: OuiNon;
  hasSameSalaire?: OuiNon;
  salaireBrut?: string;
  salaryPeriods: SalaryPeriods[];
  hasPrimes?: OuiNon;
  primes: Prime[];
  refSalary: number;
  agreementRefSAlary?: number;
};

export type SalairesStoreError = {
  errorHasTempsPartiel?: string;
  errorHasSameSalaire?: string;
  errorSalaireBrut?: string;
  errorHasPrimes?: string;
  errorTempsPartiel?: boolean;
  errorSalaryPeriods?: string;
  errorPrimes?: string;
};

export type SalairesStoreData = StepData<
  SalairesStoreInput,
  SalairesStoreError
>;

export type SalairesStoreFn = {
  onChangeHasTempsPartiel: (value: OuiNon) => void;
  onChangeHasSameSalaire: (value: OuiNon) => void;
  onChangeSalaireBrut: (value: string) => void;
  onSalariesChange: (value: SalaryPeriods[]) => void;
  onChangeHasPrimes: (value: OuiNon) => void;
  onChangePrimes: (primes: Prime[]) => void;
  onValidateStepSalaires: () => boolean;
};

export type SalairesStoreSlice = {
  salairesData: SalairesStoreData;
  salairesFunction: SalairesStoreFn;
};
