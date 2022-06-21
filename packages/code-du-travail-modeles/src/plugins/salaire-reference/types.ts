export interface IReferenceSalary<T extends SupportedCcIndemniteLicenciement> {
  computeReferenceSalary: (args: ReferenceSalaryProps<T>) => number;
}

export type LegalReferenceSalaryProps = {
  hasSameSalaire: boolean;
  salaire?: number;
  salaires: {
    month: string;
    value: number;
  }[];
  primes: number[];
};

export type CC1516ReferenceSalaryProps = {
  hasSameSalaire: boolean;
  salaire?: number;
  salaires: {
    month: string;
    value: number;
  }[];
  salairesPendantPreavis: {
    month: string;
    value: number;
  }[];
  primesPendantPreavis: number[];
};

export enum SupportedCcIndemniteLicenciement {
  IDCC1516 = "IDCC1516",
  default = "default",
}

export type ReferenceSalaryProps<T> =
  T extends SupportedCcIndemniteLicenciement.IDCC1516
    ? CC1516ReferenceSalaryProps
    : LegalReferenceSalaryProps;
