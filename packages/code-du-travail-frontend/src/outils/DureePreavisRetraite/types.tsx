import { CommonAction, CommonState } from "../Components/Simulator/types";
import { Rule } from "publicodes";
import { ConventionCollective } from "../common/type/WizardType";
import { SeniorityProps } from "./steps/SeniorityStep/Step";
import { OriginStepProps } from "./steps/OriginStep/Step";
import { InformationStepProps } from "./steps/InformationStep/Step";
import { ResultStepProps } from "./steps/ResultStep/Step";

export enum PreavisRetraiteStepLabel {
  intro = "intro",
  origin = "origine",
  agreement = "agreement",
  infos = "infos",
  seniority = "seniority",
  result = "result",
}

export type PreavisRetraiteFormState = Partial<{
  origin: PreavisRetraiteOriginFormState;
  agreement?: ConventionCollective;
  infos: Record<string, string>;
  seniority: PreavisRetraiteSeniorityFormState;
}>;

export const OriginMandatoryName = "origin.isRetirementMandatory";
export const SeniorityMoreThanXYear = "seniority.moreThanXYear";
export const SeniorityValue = "seniority.value";

export type PreavisRetraiteOriginFormState = Partial<{
  isRetirementMandatory: "oui" | "non";
}>;

export type PreavisRetraiteSeniorityFormState = Partial<{
  moreThanXYear: boolean;
  value: string;
}>;

export type Question = {
  name: string;
  rule: Rule;
  answered: boolean;
};

export type PreavisRetraiteState = {
  origin: OriginStepProps;
  seniority: SeniorityProps;
  informations: InformationStepProps;
  result?: ResultStepProps;
} & CommonState;

export type PreavisRetraiteAction<FormState> = CommonAction<FormState>;
