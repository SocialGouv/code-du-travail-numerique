import { FormApi } from "final-form";

export interface Step {
  component: (props: WizardStepProps<Record<string, string>>) => JSX.Element;
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

export interface WizardStepProps<Data> {
  form: FormApi<Data>;
  dispatch: (state: State, action: Action) => State;
}
