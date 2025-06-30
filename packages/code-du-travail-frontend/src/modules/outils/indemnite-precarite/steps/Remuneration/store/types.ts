import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";

export type SalaryEntry = {
  salaire: number | null;
};

export type RemunerationStoreInput = {
  typeRemuneration?: "total" | "mensuel";
  salaire?: number; // Pour le montant total
  salaires: SalaryEntry[]; // Pour les salaires mensuels
};

export type RemunerationStoreError = {
  typeRemuneration?: string;
  salaire?: string;
  salaires?: string;
};

export type RemunerationStoreData = {
  input: RemunerationStoreInput;
  error: RemunerationStoreError;
  hasBeenSubmit: boolean;
  isStepValid: boolean;
};

export type RemunerationStoreFn = {
  onTypeRemunerationChange: (type: "total" | "mensuel") => void;
  onSalaireChange: (salaire: number) => void;
  onSalairesChange: (salaires: SalaryEntry[]) => void;
  onNextStep: () => ValidationResponse;
};

export type RemunerationStoreSlice = {
  remunerationData: RemunerationStoreData;
  remunerationFunction: RemunerationStoreFn;
};
