import { Notification, References } from "@socialgouv/modeles-social";
import Engine, { Rule as PubliRule } from "publicodes";

import { PublicodesIndemniteLicenciementResult } from "./indemnite-licenciement";

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

export type PublicodesContextType = {
  execute: (rule: string) => PublicodesIndemniteLicenciementResult;
  getNotifications: () => Notification[];
  getReferences: () => References[];
  result: PublicodesIndemniteLicenciementResult;
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
  result: PublicodesIndemniteLicenciementResult;
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
}
