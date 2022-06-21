import { FormApi } from "final-form";
import React from "react";

import { Enterprise } from "../../../conventions/Search/api/enterprises.service";
import type { Agreement } from "../../../conventions/Search/api/type";
import { MatomoActionEvent } from "../../../lib";

export type SkipFn = (values: FormContent) => boolean;

export type Step = {
  component: (props: WizardStepProps) => JSX.Element;
  componentProps?: { actionEvent: MatomoActionEvent };
  label: string;
  name: string;
  skip?: SkipFn;
  annotation?: JSX.Element;
  isForm?: boolean;
  hasNoMarginBottom?: boolean;
  onStepDone?: (title: string, values: FormContent) => void;
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
  title: string;
};

export type AgreementRoute = "not-selected" | "agreement" | "enterprise";

export interface ConventionCollective {
  route: AgreementRoute;
  selected?: Agreement;
  enterprise?: Enterprise;
}

export type FormContent = {
  ccn?: ConventionCollective;
  criteria?: Record<string, string>;
  cdt?: Record<string, string>;
  disabledWorker?: boolean;
  typeRupture?: string;
} & Record<string, unknown>;
