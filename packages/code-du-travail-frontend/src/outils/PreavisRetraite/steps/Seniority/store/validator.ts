import { deepEqualObject } from "../../../../../lib";
import { SeniorityStoreError, SeniorityStoreInput } from "./types";

export const validateStep = (state: SeniorityStoreInput) => {
  const errorState: SeniorityStoreError = {
    errorMoreThanTwoYears: !state.moreThanTwoYears
      ? "Vous devez répondre à cette question"
      : undefined,
    errorSeniorityInMonths:
      state.moreThanTwoYears === "non" && !state.seniorityInMonths
        ? "Vous devez répondre à cette question"
        : undefined,
  };
  return {
    isValid: deepEqualObject(errorState, {
      errorMoreThanTwoYears: undefined,
      errorSeniorityInMonths: undefined,
    }),
    errorState,
  };
};
