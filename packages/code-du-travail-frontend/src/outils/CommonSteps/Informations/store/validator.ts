import { deepEqualObject } from "../../../../lib";
import { CommonInformationsStoreInput } from "./types";

export const validateStep = (state: CommonInformationsStoreInput) => {
  const informations = state.publicodesInformations;
  let errorInformations: Record<string, string> = {};
  informations.forEach((info) => {
    if (info.info === undefined) {
      errorInformations[info.question.rule.nom] =
        "Vous devez répondre à cette question";
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
