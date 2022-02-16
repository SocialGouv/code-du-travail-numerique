import { PublicodesSupportedSimulator } from ".";

export enum PublicodesConvertedUnit {
  DAY = "jour",
  MONTH = "mois",
  YEAR = "an",
  DAYS = "jours",
  WEEK = "semaine",
  WEEKS = "semaines",
}

export type PublicodesPreavisRetraiteResult = {
  type: PublicodesSupportedSimulator.PreavisRetraite;
  value: number;
  unit: PublicodesConvertedUnit;
  valueInDays?: number;
};
