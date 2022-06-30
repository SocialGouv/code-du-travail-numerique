import type Engine from "publicodes";
import type { Evaluation, Unit } from "publicodes";
import type { Rule as PubliRule } from "publicodes/dist/types/rule";

export type OldReference = {
  ref: string;
  refUrl: string;
};

export interface MissingArgs {
  name: string;
  indice: number;
  rawNode: Rule;
}

export enum RuleType {
  Liste = "liste",
  OuiNon = "oui-non",
  SalaireMensuel = "salaire-mensuel",
}

export interface RuleListe {
  type: RuleType;
  valeurs: Record<string, string>;
}

export type RuleCdtn = RuleListe;

export interface Rule extends PubliRule {
  cdtn?: RuleCdtn;
}

export interface SituationElement {
  name: string;
  rawNode: Rule;
  value: string;
}

export type PublicodesState = {
  engine: Engine;
  targetRule: string;
};

export type PublicodesData<TResult> = {
  situation: SituationElement[];
  missingArgs: MissingArgs[];
  result: TResult;
};

export type PublicodesProviderRule = {
  children: React.ReactNode;
  rules: any;
  simulator: PublicodesSimulator;
};

export enum PublicodesUnit {
  DAY = "jour",
  MONTH = "mois",
  YEAR = "an",
  EUROS = "€",
  K_EUROS = "k/€",
}

export enum PublicodesSimulator {
  INDEMNITE_LICENCIEMENT = "contrat salarié . indemnité de licenciement",
  PREAVIS_RETRAITE = "contrat salarié . préavis de retraite en jours",
}

export enum PublicodesConvertedUnit {
  DAY = "jour",
  MONTH = "mois",
  YEAR = "an",
  DAYS = "jours",
  WEEK = "semaine",
  WEEKS = "semaines",
}

export type PublicodesPreavisRetraiteResult = {
  value: number;
  unit: PublicodesConvertedUnit;
  valueInDays: number;
};

export type PublicodesIndemniteLicenciementResult = {
  value: Evaluation;
  unit?: Unit;
};
