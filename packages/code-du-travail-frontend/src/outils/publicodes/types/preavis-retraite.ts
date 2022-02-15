export enum PublicodesUnit {
  DAY = "jour",
  DAYS = "jours",
  WEEK = "semaine",
  WEEKS = "semaines",
  MONTH = "mois",
  EUROS = "€",
}

export type PublicodesPreavisRetraiteResult = {
  value: number;
  unit: PublicodesUnit;
  valueInDays?: number | undefined;
};
