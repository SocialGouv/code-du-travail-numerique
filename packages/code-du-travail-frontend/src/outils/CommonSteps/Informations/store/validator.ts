import { deepEqualObject } from "../../../../lib";
import { CommonInformationsStoreInput } from "./types";

export const validateStep = (state: CommonInformationsStoreInput) => {
  const informations = state.informations;
  const publicodesQuestions = state.publicodesQuestions;
  let errorInformations: Record<string, string> = {};
  publicodesQuestions.forEach((question) => {
    if (informations[question.rule.nom] === undefined) {
      errorInformations[question.rule.nom] = "Cette valeur est requise";
    }
  });
  let errorState = { errorInformations };

  return {
    isValid: deepEqualObject(errorState, {
      errorInformations: {},
    }),
    errorState,
  };
};
