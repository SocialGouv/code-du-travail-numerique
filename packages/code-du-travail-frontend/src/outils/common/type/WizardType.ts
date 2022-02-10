import { FormApi } from "final-form";
import React from "react";

import type { Agreement } from "../../../conventions/Search/api/type";

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

export type AgreementRoute = "not-selected" | "agreement";

export interface ConventionCollective {
  route: AgreementRoute;
  selected?: Agreement;
}

export type FormContent = {
  ccn?: ConventionCollective;
  seniorityMaximum?: boolean;
  seniorityValue?: string;
  infos?: Record<string, string>;
  criteria?: Record<string, string>;
  cdt?: Record<string, string>;
  disabledWorker?: boolean;
} & Record<string, unknown>;
