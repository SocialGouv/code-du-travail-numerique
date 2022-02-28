import { FormApi } from "final-form";
import React from "react";

import { Enterprise } from "../../../conventions/Search/api/enterprises.service";
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

export type PreavisRetraiteFormContent = {
  ccn?: ConventionCollective;
  seniorityMaximum?: boolean;
  seniorityValue?: string;
  infos?: Record<string, string>;
  criteria?: Record<string, string>;
  cdt?: Record<string, string>;
  disabledWorker?: boolean;
} & Record<string, unknown>;

export type FormContent = PreavisRetraiteFormContent;
