import { ConventionCollective } from "../../common/type/WizardType";

export type IndemniteLicenciementFormState = Partial<{
  ccn: ConventionCollective;
  hasSameSalaire: boolean;
  salaires: any[];
  primes: any[];
  salaire: number;
  anciennete: string;
  inaptitude: boolean;
  dateEntree: string;
  dateSortie: string;
  dateNotification: string;
  absencePeriods: any[];
}>;
