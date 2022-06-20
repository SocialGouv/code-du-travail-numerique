export interface ISalaireReference<T> {
  computeReferenceSalary: (args: T) => number;
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

export enum SupportedCcIndemniteLicenciement {
  IDCC1596 = "IDCC1596",
  default = "default",
}
