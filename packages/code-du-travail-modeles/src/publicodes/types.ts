import type Engine from "publicodes";
import type {
  Evaluation,
  Rule as PubliRule,
  RuleNode as PubliRuleNode,
  Unit,
} from "publicodes";

import type { Notification, References } from "../modeles/common";
import type {
  IndemniteLicenciementPublicodes,
  PreavisRetraitePublicodes,
  RuptureConventionnellePublicodes,
} from ".";

export type OldReference = {
  ref: string | null;
  refUrl: string | null;
};

export interface MissingArgs {
  name: string;
  indice: number;
  rawNode: Rule;
}

export enum RuleType {
  Liste = "liste",
  OuiNon = "oui-non",
  Date = "date",
  Montant = "montant",
}

export interface RuleListe {
  type: RuleType;
  valeurs: Record<string, string>;
  precision?: string;
}

export type RuleCdtn = RuleListe;

export interface Rule extends PubliRule {
  cdtn?: RuleCdtn;
}

export type NotificationAffichage =
  | "conventionnel"
  | "default"
  | "légal et conventionnel"
  | "légal";

export interface NotificationRuleNode<Name extends string = string>
  extends PubliRuleNode<Name> {
  rawNode: PubliRule & {
    cdtn?: {
      bloquante?: "non" | "oui";
      affichage?: NotificationAffichage;
    };
  };
}

export interface SituationElement {
  name: string;
  rawNode: Rule;
  value?: string;
}

export type PublicodesState = {
  engine: Engine;
  targetRule: string;
};

export type PublicodesData<TResult> = {
  situation: SituationElement[];
  missingArgs: MissingArgs[];
  result: TResult;
  ineligibility?: string;
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
  INDEMNITE_LICENCIEMENT = "INDEMNITE_LICENCIEMENT",
  PREAVIS_RETRAITE = "PREAVIS_RETRAITE",
  RUPTURE_CONVENTIONNELLE = "RUPTURE_CONVENTIONNELLE",
}

export const PublicodesDefaultRules = {
  [PublicodesSimulator.INDEMNITE_LICENCIEMENT]:
    "contrat salarié . indemnité de licenciement . résultat légal",
  [PublicodesSimulator.PREAVIS_RETRAITE]:
    "contrat salarié . préavis de retraite en jours",
  [PublicodesSimulator.RUPTURE_CONVENTIONNELLE]:
    "contrat salarié . indemnité de licenciement . résultat légal",
};

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
  ineligibility?: string;
};

export type PublicodesContextType = {
  execute: (rule: string) => PublicodesIndemniteLicenciementResult;
  getNotifications: () => Notification[];
  getReferences: () => References[];
  result: PublicodesIndemniteLicenciementResult;
  missingArgs: MissingArgs[];
  situation: SituationElement[];
  calculate: (values: Record<string, string>) => void;
  setSituation: (values: Record<string, string>) => void;
};

export type PublicodesInstance<T extends PublicodesSimulator> =
  T extends PublicodesSimulator.PREAVIS_RETRAITE
    ? PreavisRetraitePublicodes
    : T extends PublicodesSimulator.INDEMNITE_LICENCIEMENT
    ? IndemniteLicenciementPublicodes
    : T extends PublicodesSimulator.RUPTURE_CONVENTIONNELLE
    ? RuptureConventionnellePublicodes
    : never;
