import { FormApi } from "final-form";
import React from "react";

export interface Step {
  component: (props: WizardStepProps) => JSX.Element;
  label: string;
  name: string;
  skip?: (values: FormContent) => boolean;
  annotation?: (props: WizardStepProps) => JSX.Element;
}

export interface State {
  steps: Array<Step>;
  stepIndex: number;
}

export enum ActionName {
  reset = "reset",
  setStepIndex = "setStepIndex",
}

export type Action =
  | { type: ActionName.reset }
  | { type: ActionName.setStepIndex; payload: number };

export interface WizardStepProps {
  form: FormApi<FormContent>;
  dispatch: React.Dispatch<Action>;
}

export interface ConventionCollective {
  id: string;
  num: number;
  shortTitle: string;
  slug: string;
  title: string;
}

export type FormContent = Record<string, string> & {
  ccn?: ConventionCollective;
  seniorityMaximum: boolean;
  seniorityValue: string;
  infos?: Record<string, string>;
};
