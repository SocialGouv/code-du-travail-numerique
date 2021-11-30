import data from "@cdt/data...simulateurs/heures-recherche-emploi.data.json";

import { StepInfoCCnOptionnal } from "../common/InfosCCn";
import { isNotYetProcessed } from "../common/situations.utils";
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
      component: StepInfoCCnOptionnal,
      label: "Convention collective",
      name: "info_cc",
    },
    {
      component: StepTypeRupture,
      isForm: true,
      label: "Type de rupture",
      name: "rupture",
      skip: skipTypeRupture,
    },
    {
      component: StepInformations,
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

function ccnNotProcessed(values) {
  return (
    !values.ccn ||
    (values.ccn && isNotYetProcessed(data.situations, values.ccn.num))
  );
}
function skipTypeRupture(values) {
  return (
    ccnNotProcessed(values) ||
    data.situations.filter(({ idcc }) => idcc === values?.ccn.num).length <= 1
  );
}

function skipInformations(values) {
  return (
    ccnNotProcessed(values) ||
    data.situations.filter(
      ({ idcc, typeRupture }) =>
        typeRupture === values?.typeRupture && idcc === values?.ccn.num
    ).length <= 1
  );
}

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
