import {
  ChosenResult,
  Formula,
  Notification,
  References,
} from "@socialgouv/modeles-social";

export type ResultStoreData = {
  result?: number;
  calculationError?: string;
  resultNotifications?: Notification[];
  resultReferences?: References[];
  resultFormula?: Formula;
  totalSalary?: number;
  /**
   * Origine du taux réellement appliqué. `AGREEMENT` signale que le montant
   * vient des dispositions de la convention de branche, et non du Code du
   * travail : l'écran de résultat en tire la variante du bloc d'avertissement.
   */
  chosenResult?: ChosenResult;
};

export type ResultStoreFn = {
  calculateResult: () => void;
};

export type ResultStoreSlice = {
  resultData: ResultStoreData;
  resultFunction: ResultStoreFn;
};
