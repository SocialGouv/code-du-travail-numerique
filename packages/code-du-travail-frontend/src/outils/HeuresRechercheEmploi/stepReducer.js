import data from "@cdt/data...simulateurs/heures-recherche-emploi.data.json";

import { StepInfoCCnOptionnal } from "../common/InfosCCn";
import { isNotYetProcessed } from "../common/situations.utils";
import { StepInformations } from "./steps/Informations";
import { StepIntro } from "./steps/Introduction";
import { StepResult } from "./steps/Result";

export const initialState = {
  stepIndex: 0,
  steps: [
    {
      component: StepIntro,
      label: "Introduction",
      name: "intro",
    },
    {
      component: StepInfoCCnOptionnal,
      label: "Convention collective",
      name: "info_cc",
    },
    {
      component: StepInformations,
      label: "Informations",
      name: "infos",
      skip: (values) =>
        !values.ccn ||
        (values.ccn && isNotYetProcessed(data.situations, values.ccn.num)) ||
        data.situations.filter(({ idcc }) => idcc === values.ccn.num).length ===
          1,
    },
    {
      component: StepResult,
      label: "Durée du préavis",
      name: "results",
    },
  ],
};

export function stepReducer(state, { type, payload }) {
  switch (type) {
    case "reset": {
      return { ...initialState };
    }
    case "setStepIndex": {
      return { stepIndex: payload, steps: state.steps };
    }
    default:
      console.warn("action unknow", type);
      return state;
  }
}
