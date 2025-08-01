import type Engine from "publicodes";
import type {
  Evaluation,
  Rule as PubliRule,
  RuleNode as PubliRuleNode,
  Unit,
} from "publicodes";

import type {
  Formula,
  IReferenceSalary,
  ISeniority,
  Notification,
  References,
  SupportedCc,
} from "../modeles";
import type { IIneligibility } from "../modeles/common/types/ineligibility";
import type {
  IndemniteLicenciementPublicodes,
  IndemnitePrecaritePublicodes,
  PreavisDemissionPublicodes,
  PreavisLicenciementPublicodes,
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

export type PublicodesIneligibility = {
  type: "ineligibility";
  ineligibility: string;
};

export type PublicodesMissingArgs = {
  type: "missing-args";
  missingArgs: MissingArgs[];
};

export type ChosenResult = "AGREEMENT" | "HAS_NO_LEGAL" | "LEGAL" | "SAME";

export type PublicodesResult<TResult> = {
  type: "result";
  result: TResult;
  detail: {
    chosenResult: ChosenResult;
    legalResult?: TResult;
    agreementResult?: TResult;
    agreementExplanation?: ExplanationAgreementResult;
  };
  explanation: ExplanationMainResult;
  formula: Formula;
  notifications: Notification[];
  references: References[];
  situation: SituationElement[];
};

export type ExplanationAgreementResult =
  | "AGREEMENT_NOT_SUPPORTED"
  | "AGREEMENT_RESULT_ZERO"
  | "IS_HORS_ANI"
  | "NO_AGREEMENT_SELECTED"
  | "NO_EXPLANATION";

export type ExplanationMainResult =
  | "AGREEMENT_AMOUNT_MORE"
  | "AGREEMENT_NOT_SUPPORTED"
  | "AGREEMENT_RESULT_ZERO"
  | "HAS_NOT_SELECTED_AGREEMENT"
  | "LEGAL_AMOUNT_MORE"
  | "LEGAL_RESULT_ZERO_BUT_AGREEMENT"
  | "NO_EXPLANATION"
  | "SAME_AMOUNT";

export type PublicodesOutput<TResult> =
  | PublicodesIneligibility
  | PublicodesMissingArgs
  | PublicodesResult<TResult>;

export type PublicodesData<TResult> = {
  situation: SituationElement[];
  missingArgs: MissingArgs[];
  result: TResult;
};

export enum PublicodesSimulator {
  INDEMNITE_LICENCIEMENT = "INDEMNITE_LICENCIEMENT",
  PREAVIS_RETRAITE = "PREAVIS_RETRAITE",
  RUPTURE_CONVENTIONNELLE = "RUPTURE_CONVENTIONNELLE",
  PREAVIS_LICENCIEMENT = "PREAVIS_LICENCIEMENT",
  PREAVIS_DEMISSION = "PREAVIS_DEMISSION",
  HEURES_RECHERCHE_EMPLOI = "HEURES_RECHERCHE_EMPLOI",
  INDEMNITE_PRECARITE = "INDEMNITE_PRECARITE",
}

export const PublicodesDefaultRules = {
  [PublicodesSimulator.INDEMNITE_LICENCIEMENT]:
    "contrat salarié . indemnité de licenciement . résultat légal",
  [PublicodesSimulator.PREAVIS_RETRAITE]:
    "contrat salarié . préavis de retraite en jours",
  [PublicodesSimulator.RUPTURE_CONVENTIONNELLE]:
    "contrat salarié . indemnité de licenciement . résultat légal",
  [PublicodesSimulator.PREAVIS_LICENCIEMENT]:
    "contrat salarié . résultat légal",
  [PublicodesSimulator.HEURES_RECHERCHE_EMPLOI]:
    "contrat salarié . résultat légal",
  [PublicodesSimulator.PREAVIS_DEMISSION]:
    "contrat salarié . préavis de démission . résultat légal",
  [PublicodesSimulator.INDEMNITE_PRECARITE]: "contrat salarié . résultat légal",
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

export type PublicodesPreavisLicenciementResult = {
  value: Evaluation<number>;
  unit?: Unit;
};

export type PublicodesPreavisDemissionResult = {
  value: Evaluation<number>;
  unit?: Unit;
};

export type PublicodesIndemnitePrecariteResult = {
  value: Evaluation<number>;
  unit?: Unit;
  ineligibility?: string;
};

export type PublicodesIndemniteLicenciementResult = {
  value: Evaluation<number>;
  unit?: Unit;
  ineligibility?: string;
};

export type PublicodesInstance<T extends PublicodesSimulator> =
  T extends PublicodesSimulator.PREAVIS_RETRAITE
    ? PreavisRetraitePublicodes
    : T extends PublicodesSimulator.INDEMNITE_LICENCIEMENT
      ? IndemniteLicenciementPublicodes
      : T extends PublicodesSimulator.RUPTURE_CONVENTIONNELLE
        ? RuptureConventionnellePublicodes
        : T extends PublicodesSimulator.PREAVIS_LICENCIEMENT
          ? PreavisLicenciementPublicodes
          : T extends PublicodesSimulator.PREAVIS_DEMISSION
            ? PreavisDemissionPublicodes
            : T extends PublicodesSimulator.INDEMNITE_PRECARITE
              ? IndemnitePrecaritePublicodes
              : never;

export interface IndemniteDepartInstance {
  ineligibility: IIneligibility;

  seniority: ISeniority<SupportedCc>;

  salary: IReferenceSalary<SupportedCc>;
}
