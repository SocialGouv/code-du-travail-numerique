import { PreavisRetraiteStore } from "../types";
import { UpdateFormValues } from "../utils";
import { Agreement } from "@socialgouv/cdtn-types";

const resetInfos = (
  newAgreement: Agreement | null,
  oldAgreement: Agreement | null,
  state: PreavisRetraiteStore,
  removeQuestionFromForm: UpdateFormValues
): PreavisRetraiteStore => {
  if (newAgreement === null && oldAgreement === null) {
    return state;
  }
  if (
    newAgreement !== null &&
    oldAgreement !== null &&
    newAgreement.id === oldAgreement.id
  ) {
    return state;
  }
  removeQuestionFromForm([{ name: "infos" }]);
  return {
    ...state,
    steps: {
      ...state.steps,
      informations: {
        questions: [],
      },
    },
    formValues: {
      ...state.formValues,
      infos: {},
    },
  };
};

export default resetInfos;
