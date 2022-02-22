import { FormApi } from "final-form";
import React from "react";

export type SkipFn = (values: FormContent) => boolean;

export type Step = {
  component: (props: WizardStepProps) => JSX.Element;
  label: string;
  name: string;
  skip?: SkipFn;
  annotation?: () => JSX.Element;
  isForm?: boolean;
  hasNoMarginBottom?: boolean;
};

export type State = {
  steps: Array<Step>;
  stepIndex: number;
};

export enum ActionName {
  reset = "reset",
  setStepIndex = "setStepIndex",
}

export type Action =
  | { type: ActionName.reset }
  | { type: ActionName.setStepIndex; payload: number };

export type WizardStepProps = {
  form: FormApi<FormContent>;
  dispatch: React.Dispatch<Action>;
};

export type ConventionCollective = {
  id: string;
  num: number;
  shortTitle: string;
  slug: string;
  title: string;
};

export type PreavisRetraiteFormContent = Record<string, string> & {
  ccn?: ConventionCollective;
  seniorityMaximum?: boolean;
  seniorityValue?: string;
  infos?: Record<string, string>;
};

export type IndemniteLicenciementFormContent = Record<string, string> & {
  ccn?: ConventionCollective;
  infos?: Record<string, string>;
};

export type FormContent =
  | PreavisRetraiteFormContent
  | IndemniteLicenciementFormContent;
