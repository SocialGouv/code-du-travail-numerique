import { pushEvents } from "../common";
import {
  Action,
  ActionName,
  FormContent,
  State,
} from "../common/type/WizardType";
import { AgreementStep } from "./steps/AgreementStep";
import { StepIndemnite } from "./steps/Indemnite";
import { StepInfosGenerales } from "./steps/InfosGenerales";
import { StepIntro } from "./steps/Introduction";
import { StepRemuneration } from "./steps/Remuneration";

export const initialState = {
  stepIndex: 0,
  steps: [
    {
      component: StepIntro,
      label: "Introduction",
      name: "intro",
    },
    {
      component: AgreementStep,
      label: "Convention collective",
      name: "info_cc",
      onStepDone: (title: string, data: FormContent): void => {
        if (data.ccn) pushEvents(title, data.ccn);
      },
    },
    {
      component: StepInfosGenerales,
      isForm: true,
      label: "Informations générales",
      name: "info_generales",
    },
    {
      component: StepRemuneration,
      isForm: true,
      label: "Rémunération",
      name: "remuneration",
    },
    {
      component: StepIndemnite,
      label: "Indemnité",
      name: "indemnite",
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
