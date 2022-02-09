import data from "@cdt/data...simulateurs/preavis-licenciement.data.json";
import React from "react";

import { SelectAgreementStep } from "../common/Agreement/SelectAgreementStep";
import { isNotYetProcessed } from "../common/situations.utils";
import { Action, ActionName, State } from "../common/type/WizardType";
import { StepInformations } from "./steps/Informations";
import { StepIntro } from "./steps/Introduction";
import { StepResult } from "./steps/Result";
import { StepStatus } from "./steps/Status";

export const initialState = {
  stepIndex: 0,
  steps: [
    {
      component: StepIntro,
      label: "Introduction",
      name: "intro",
    },
    {
      component: StepStatus,
      label: "Situation du salarié",
      name: "situation",
    },
    {
      component: SelectAgreementStep,
      label: "Convention collective",
      name: "info_cc",
    },
    {
      component: StepInformations,
      label: "Informations complémentaires",
      name: "infos",
      skip: (values) =>
        !values.ccn ||
        (values.ccn && isNotYetProcessed(data.situations, values.ccn.num)),
    },
    {
      component: StepResult,
      label: "Durée du préavis",
      name: "results",
    },
  ],
};

export function stepReducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionName.reset: {
      return { ...initialState };
    }
    case ActionName.setStepIndex: {
      return { stepIndex: action.payload, steps: state.steps };
    }
  }
}
