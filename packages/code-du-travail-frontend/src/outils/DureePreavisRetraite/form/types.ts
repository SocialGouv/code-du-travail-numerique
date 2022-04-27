import { ConventionCollective } from "../../common/type/WizardType";

export type PreavisRetraiteFormState = Partial<{
  origin: PreavisRetraiteOriginFormState;
  ccn?: ConventionCollective;
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
