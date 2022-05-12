import { PreavisRetraiteStore } from "../types";
import { UpdateFormValues } from "../utils";
import { SeniorityValue } from "../../form";

const askAccurateSeniority = (
  state: PreavisRetraiteStore,
  updateForm: UpdateFormValues
): PreavisRetraiteStore => {
  let seniorityMonths: string | undefined = undefined;
  if (state.formValues.seniority?.moreThanXYear === true) {
    seniorityMonths = `${state.steps.seniority.minYearCount * 12 + 1}`;
  }
  updateForm([{ name: SeniorityValue, value: seniorityMonths }]);
  return {
    ...state,
    formValues: {
      ...state.formValues,
      seniority: {
        ...state.formValues.seniority,
        value: seniorityMonths,
      },
    },
    steps: {
      ...state.steps,
      seniority: {
        ...state.steps.seniority,
        showAccurateSeniority: !state.formValues.seniority?.moreThanXYear,
      },
    },
  };
};

export default askAccurateSeniority;
