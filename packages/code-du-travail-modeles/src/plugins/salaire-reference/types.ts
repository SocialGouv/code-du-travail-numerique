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

type VProps = {
  sisi: boolean;
};

export enum SupportedCcIndemniteLicenciement {
  IDCCV = "IDCCV", //TODO: to remove
  IDCC1596 = "IDCC1596",
  default = "default",
}

export type ReferenceSalaryProps<T> =
  T extends SupportedCcIndemniteLicenciement.IDCC1596
    ? LegalReferenceSalaryProps
    : T extends SupportedCcIndemniteLicenciement.IDCCV
    ? VProps
    : LegalReferenceSalaryProps;
