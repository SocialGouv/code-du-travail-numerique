import { Notification } from "@socialgouv/modeles-social";
import { References } from "@socialgouv/modeles-social/bin/utils/GetReferences";
import Engine, { Rule as PubliRule } from "publicodes";

import { PublicodesIndemniteLicenciementResult } from "./indemnite-licenciement";
import { PublicodesPreavisRetraiteResult } from "./preavis-retraite";

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

export type PublicodesResult =
  | PublicodesPreavisRetraiteResult
  | PublicodesIndemniteLicenciementResult;

export type PublicodesContextType<T extends PublicodesResult> = {
  execute: (rule: string) => T;
  getNotifications: () => Notification[];
  getReferences: () => References[];
  result: T;
  missingArgs: MissingArgs[];
  situation: SituationElement[];
  setSituation: (values: Record<string, string>) => void;
};

export type PublicodesState = {
  engine: Engine;
  targetRule: string;
};

export type PublicodesData = {
  situation: Array<SituationElement>;
  missingArgs: MissingArgs[];
  result: PublicodesResult;
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
