import data from "@cdt/data...simulateurs/preavis-demission.data.json";

import { MatomoActionEvent } from "../../lib";
import { isNotYetProcessed } from "../common/situations.utils";
import { StepInformations } from "../common/StepInformations";
import { StepInfoCCn } from "./steps/InfosCCn";
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
      component: StepInfoCCn,
      label: "Convention collective",
      name: "info_cc",
    },
    {
      component: StepInformations,
      componentProps: {
        actionEvent: MatomoActionEvent.PREAVIS_DEMISSION,
      },
      hasNoMarginBottom: true,
      isForm: true,
      label: "Informations",
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
