import { deepEqualObject } from "src/modules/utils/object";
import { SeniorityStoreError, SeniorityStoreInput } from "./types";

export const validateStep = (state: SeniorityStoreInput) => {
  const errorState: SeniorityStoreError = {
    errorMoreThanXYears: !state.moreThanXYears
      ? "Vous devez répondre à cette question"
      : undefined,
    errorSeniorityInMonths:
      state.moreThanXYears === "non" && !state.seniorityInMonths
        ? "Vous devez répondre à cette question"
        : undefined,
  };
  return {
    isValid: deepEqualObject(errorState, {
      errorMoreThanXYears: undefined,
      errorSeniorityInMonths: undefined,
    }),
    errorState,
  };
};
