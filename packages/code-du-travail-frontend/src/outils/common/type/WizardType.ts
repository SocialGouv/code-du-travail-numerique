import { FormApi } from "final-form";

export interface Step {
  component: (props: WizardStepProps) => JSX.Element;
  label: string;
  name: string;
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
  dispatch: (state: State, action: Action) => State;
}

interface ConventionCollective {
  id: string;
  num: number;
  shortTitle: string;
  slug: string;
  title: string;
}

export type FormContent = Record<string, string> & {
  ccn?: ConventionCollective;
  infos?: Record<string, string>;
};
