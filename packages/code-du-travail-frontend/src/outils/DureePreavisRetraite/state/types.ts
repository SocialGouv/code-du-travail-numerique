import { Rule } from "@socialgouv/modeles-social";
import { ResultStepProps } from "../steps/ResultStep/Step";
import { PreavisRetraiteFormState } from "../form";
import { FormApi } from "final-form";
import { Publicodes } from "@socialgouv/modeles-social/bin";
import { PublicodesPreavisRetraiteResult } from "@socialgouv/modeles-social/bin/publicodes/types";
import { Step } from "../../Simulator";
import { StepName } from "../steps";
import { Agreement } from "@socialgouv/cdtn-utils";

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
      error?: string;
    };
    result?: ResultStepProps;
  };
  formValues: PreavisRetraiteFormState;
};

export type PublicodesState = {
  publicodes: Publicodes<PublicodesPreavisRetraiteResult>;
};

export type PreavisRetraiteActions = {
  onStepChange: (oldStep: Step<StepName>, newStep: Step<StepName>) => void;
  onFormValuesChange: (values: PreavisRetraiteFormState) => void;
  onOriginChange: (oldType: Origin | null, newType: Origin | null) => void;
  onAgreementChange: (
    newValue: Agreement | null,
    oldValue: Agreement | null,
    form: FormApi
  ) => void;
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
