import { Rule } from "publicodes";
import { ResultStepProps } from "../steps/ResultStep/Step";
import { PreavisRetraiteFormState } from "../form";
import { FormApi } from "final-form";
import { Publicodes } from "@socialgouv/modeles-social/bin";
import { PublicodesPreavisRetraiteResult } from "@socialgouv/modeles-social/bin/publicodes/types";
import { Step } from "../../Simulator";
import { StepName } from "../steps";

export type PreavisRetraiteState = {
  title: string;
  steps: {
    origin: {
      showWarning: boolean;
    };
    seniority: {
      minYearCount: number;
      showAccurateSeniority: boolean;
    };
    informations: {
      questions: Question[];
    };
    result?: ResultStepProps;
  };
  formValues: PreavisRetraiteFormState;
};

export type PublicodesState = {
  publicodes: Publicodes<PublicodesPreavisRetraiteResult>;
};

export type PreavisRetraiteActions = {
  onStepChange: (step: Step<StepName>) => void;
  onFormValuesChange: (values: PreavisRetraiteFormState) => void;
  onOriginChange: (type: Origin) => void;
  onAgreementChange: (form: FormApi) => void;
  onInformationChange: (name: string, form: FormApi) => void;
  onSeniorityChange: (form: FormApi) => void;
};

export type PreavisRetraiteStore = PreavisRetraiteState &
  PreavisRetraiteActions &
  PublicodesState;

export type Question = {
  name: string;
  rule: Rule;
};

export type Origin = "mise" | "départ";
