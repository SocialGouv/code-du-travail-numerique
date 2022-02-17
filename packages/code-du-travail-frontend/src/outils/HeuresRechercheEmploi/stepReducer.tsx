import data from "@cdt/data...simulateurs/heures-recherche-emploi.data.json";

import { pushEvents } from "../common";
import { skipStep } from "../common/situations.utils";
import {
  Action,
  ActionName,
  FormContent,
  State,
} from "../common/type/WizardType";
import { AgreementStep } from "./steps/AgreementStep";
import { StepInformations } from "./steps/Informations";
import { StepIntro } from "./steps/Introduction";
import { StepResult } from "./steps/Result";
import { StepTypeRupture } from "./steps/TypeRupture";

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
      component: StepTypeRupture,
      hasNoMarginBottom: true,
      isForm: true,
      label: "Type de rupture",
      name: "rupture",
      skip: skipTypeRupture,
    },
    {
      component: StepInformations,
      hasNoMarginBottom: true,
      isForm: true,
      label: "Informations",
      name: "infos",
      skip: skipInformations,
    },
    {
      component: StepResult,
      label: "Résultat",
      name: "results",
    },
  ],
};

const ccnNotProcessed = (values: FormContent): boolean =>
  skipStep(data.situations, values.ccn?.selected?.num);

function skipTypeRupture(values: FormContent): boolean {
  return (
    ccnNotProcessed(values) ||
    data.situations.filter(({ idcc }) => idcc === values?.ccn?.selected?.num)
      .length <= 1
  );
}

function skipInformations(values: FormContent): boolean {
  return (
    ccnNotProcessed(values) ||
    data.situations.filter(
      ({ idcc, typeRupture }) =>
        typeRupture === values?.typeRupture &&
        idcc === values?.ccn?.selected?.num
    ).length <= 1
  );
}

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
