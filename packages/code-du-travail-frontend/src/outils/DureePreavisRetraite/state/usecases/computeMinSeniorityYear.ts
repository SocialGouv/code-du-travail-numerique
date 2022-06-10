import { PreavisRetraiteStore } from "../types";

const computeMinSeniorityYear = (
  state: PreavisRetraiteStore
): PreavisRetraiteStore => {
  const yearCount =
    state.formValues.ccn?.selected?.num === 2264 &&
    state.formValues.origin?.isRetirementMandatory === "oui"
      ? 5
      : 2;
  return {
    ...state,
    steps: {
      ...state.steps,
      seniority: {
        ...state.steps.seniority,
        minYearCount: yearCount,
      },
    },
  };
};

export default computeMinSeniorityYear;
